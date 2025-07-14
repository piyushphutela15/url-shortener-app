export const logEvent = (type, message, metadata) => {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  const log = {
    id: Date.now(),
    type,
    message,
    metadata,
    timestamp: new Date().toISOString()
  };
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));
};