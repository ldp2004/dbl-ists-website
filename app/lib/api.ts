export async function fetchAPI(path: string, options = {}) {
  // Skip real API calls during build if environment variable is set
  if (process.env.SKIP_API_CALLS === 'true' && process.env.NODE_ENV === 'production') {
    console.log(`Skipping API call to ${path} during build`);
    // Return mock data based on the endpoint
    return getMockDataForPath(path);
  }

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${apiUrl}${path}`, mergedOptions);
  
  if (!res.ok) {
    console.error(`API error: ${res.status} on ${path}`);
    return null;
  }
  
  const data = await res.json();
  return data;
}

// Helper function to return appropriate mock data based on the endpoint
function getMockDataForPath(path: string) {
  // Customize this function to return appropriate mock data for each endpoint
  // Example:
  if (path.includes('/contact')) {
    return { 
      contact: { 
        title: "Contact Us", 
        description: "Mock contact page data" 
      } 
    };
  }
  
  if (path.includes('/about')) {
    return { 
      about: { 
        title: "About Us", 
        description: "Mock about page data" 
      } 
    };
  }
  
  // Default fallback data
  return { data: [] };
} 