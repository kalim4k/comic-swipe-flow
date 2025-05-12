
/**
 * Format a timestamp into a relative time string (e.g., "2 minutes ago")
 */
export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (secondsDiff < 60) return "à l'instant";
  if (secondsDiff < 3600) return `il y a ${Math.floor(secondsDiff / 60)} min`;
  if (secondsDiff < 86400) return `il y a ${Math.floor(secondsDiff / 3600)} h`;
  if (secondsDiff < 2592000) return `il y a ${Math.floor(secondsDiff / 86400)} j`;
  
  // Format as date for older timestamps
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
