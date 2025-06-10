import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const AdminDebug: React.FC = () => {
  const { user } = useAuth();
  const [adminEmails, setAdminEmails] = useState<any[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdminEmails();
  }, []);

  const fetchAdminEmails = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_emails')
        .select('*');
      
      if (error) {
        console.error('Error fetching admin emails:', error);
        setMessage(`Error: ${error.message}`);
      } else {
        setAdminEmails(data || []);
        setMessage(`Found ${data?.length || 0} admin emails`);
      }
    } catch (error: any) {
      console.error('Exception fetching admin emails:', error);
      setMessage(`Exception: ${error.message}`);
    }
  };

  const addAdminEmail = async () => {
    if (!newEmail.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('admin_emails')
        .insert({ email: newEmail.trim() });
      
      if (error) {
        setMessage(`Error adding email: ${error.message}`);
      } else {
        setMessage(`Successfully added ${newEmail}`);
        setNewEmail('');
        fetchAdminEmails();
      }
    } catch (error: any) {
      setMessage(`Exception: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkCurrentUserAdmin = async () => {
    if (!user?.email) {
      setMessage('No user logged in');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('admin_emails')
        .select('email')
        .eq('email', user.email)
        .maybeSingle();
      
      if (error) {
        setMessage(`Error checking admin status: ${error.message}`);
      } else {
        setMessage(`Current user (${user.email}) is ${data ? 'ADMIN' : 'NOT ADMIN'}`);
      }
    } catch (error: any) {
      setMessage(`Exception: ${error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin System Debug</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">Current User: {user?.email || 'Not logged in'}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Admin Emails in Database:</h3>
        {adminEmails.length > 0 ? (
          <ul className="list-disc list-inside">
            {adminEmails.map((admin, index) => (
              <li key={index} className="text-sm">{admin.email}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No admin emails found</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add Admin Email:</h3>
        <div className="flex gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={addAdminEmail}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={checkCurrentUserAdmin}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Check Current User Admin Status
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={fetchAdminEmails}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Refresh Admin Emails
        </button>
      </div>

      {message && (
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm">{message}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDebug;