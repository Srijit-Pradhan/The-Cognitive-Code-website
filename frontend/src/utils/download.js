export const forceDownload = async (fileUrl, fileName) => {
  try {
    const response = await fetch(fileUrl);
    
    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    // Create a blob URL
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName || 'download'); // Force download attribute
    document.body.appendChild(link);
    
    // Trigger the click event
    link.click();
    
    // Clean up
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Direct download failed, falling back to opening in new tab:', error);
    // Fallback if CORS or fetch fails
    window.open(fileUrl, '_blank');
  }
};
