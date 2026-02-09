import { api } from '../../services/api';

const MessagesTab = ({ contacts, token, onUpdate }) => {
  const handleMarkRead = async (id) => {
    try {
      await api.markContactRead(id, token);
      onUpdate();
    } catch (error) {
      alert('Error marking as read');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.deleteContact(id, token);
      onUpdate();
    } catch (error) {
      alert('Error deleting message');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Messages ({contacts.length})</h2>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className={`bg-gray-800 rounded-xl p-6 border ${
              contact.read ? 'border-gray-700' : 'border-blue-500'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{contact.name}</h3>
                <p className="text-gray-400">{contact.email}</p>
                {contact.subject && <p className="text-sm text-gray-500 mt-1">{contact.subject}</p>}
              </div>
              <div className="flex gap-2">
                {!contact.read && (
                  <button
                    onClick={() => handleMarkRead(contact._id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-300">{contact.message}</p>
            <p className="text-xs text-gray-500 mt-4">
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {contacts.length === 0 && (
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
            <p className="text-gray-400">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesTab;
