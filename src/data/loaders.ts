import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

// Add NextFetchRequestConfig interface
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    // Use type assertion for fetch options
    const requestConfig: NextFetchRequestConfig = {
      ...authToken ? headers : {},
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ['strapi-data'], // Add cache tag for manual revalidation
      }
    };
    
    const response = await fetch(url, requestConfig);
    
    // Check if response is OK before parsing JSON
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return empty but valid data structures to prevent undefined mapping errors
    return { 
      data: { 
        attributes: { blocks: [] }
      } 
    };
  }
}

export async function getGlobalData() {
  // Provide fallback data structure
  const defaultData = {
    data: {
      attributes: {
        header: {
          logoText: { text: 'DBL Web' },
          navLink: [
            { id: 1, text: 'Home', url: '/' },
            { id: 2, text: 'Services', url: '/services' },
            { id: 3, text: 'Portfolio', url: '/portfolio' },
            { id: 4, text: 'About', url: '/about' },
          ],
          ctaButton: { text: 'Contact Us', url: '/contact' }
        },
        footer: {
          logoText: { text: 'DBL Web' },
          externalLink: [
            { id: 1, text: 'Twitter', url: 'https://twitter.com' },
            { id: 2, text: 'LinkedIn', url: 'https://linkedin.com' }
          ],
          footerText: '© 2024 DBL Web. All rights reserved.'
        }
      }
    }
  };

  try {
    const url = new URL("/api/global", baseUrl);

    url.search = qs.stringify({
      populate: [
        "header.logoText",
        "header.navLink",
        "header.ctaButton",
        "footer.logoText",
        "footer.externalLink",
      ],
    });

    const result = await fetchData(url.href);
    // Check if result has the expected structure
    if (!result?.data?.attributes) {
      console.warn("API returned unexpected data structure for global data");
      return defaultData;
    }
    
    return result;
  } catch (error) {
    console.error("Failed to fetch global data:", error);
    return defaultData;
  }
}

export async function getGlobalPageMetadata() {
  const defaultData = {
    data: {
      title: 'DBL Web — Your partner in modernization',
      description: 'Helping businesses modernize their technology stack'
    }
  };

  try {
    const url = new URL("/api/global", baseUrl);

    url.search = qs.stringify({
      fields: ["title", "description"],
    });

    const result = await fetchData(url.href);
    if (!result?.data) {
      return defaultData;
    }
    
    return result;
  } catch (error) {
    console.error("Failed to fetch global metadata:", error);
    return defaultData;
  }
}

export async function getHomePageData() {
  try {
    const url = new URL("/api/home-page", baseUrl);

    url.search = qs.stringify({
      populate: {
        blocks: {
          on: {
            "layout.hero-section": {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
                link: {
                  populate: true,
                },
              },
            },
            "layout.feature-list-section": {
              populate: {
                feature: {
                  populate: true,
                },
              },
            },
            "layout.feature-section": {
              populate: {
                feature: {
                  populate: true,
                },
              },
            },
          },
        },
      },
    });

    return await fetchData(url.href);
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
    return { data: { attributes: { blocks: [] } } };
  }
}

export async function getServicePageData() {
  try {
    const url = new URL("/api/service-page", baseUrl);

    url.search = qs.stringify({
      populate: {
        blocks: {
          on: {
            "layout.hero-section": {
              populate: {
                link: {
                  populate: true
                },
                heroMedia: {
                  populate: '*'
                }
              }
            },
            "layout.services-section": {
              populate: {
                services: {
                  populate: true
                }
              }
            },
            "layout.brand-list-section": {
              populate: {
                brands: {
                  populate: '*'
                }
              }
            }
          }
        }
      }
    });

    return await fetchData(url.href);
  } catch (error) {
    console.error("Failed to fetch service page data:", error);
    return { data: { attributes: { blocks: [] } } };
  }
}

export async function getAboutPageData() {
  try {
    const url = new URL("/api/about-page", baseUrl);
    
    url.search = qs.stringify({
      populate: {
        blocks: {
          on: {
            "layout.feature-section": {
              populate: {
                feature: {
                  populate: true,
                }
              }
            }
          }
        }
      }
    });

    return await fetchData(url.href);
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return { data: { attributes: { blocks: [] } } };
  }
}

export async function getContactPageData() {
  const url = new URL("/api/contact-page", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.feature-section": {
            populate: {
              feature: {
                populate: true,
              }
            }
          }
        }
      }
    }
  });

  return await fetchData(url.href);
}

export async function getPortfolioPageData() {
  const url = new URL("/api/portfolio-page", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.hero-section": {
            populate: '*'
          },
        }
      }
    }
  });

  return await fetchData(url.href);
}

// Example function to fetch portfolio items with sorting
export async function getPortfolioItems() {
  const url = new URL("/api/portfolios", baseUrl);
  // Build query with qs
  url.search = qs.stringify({
    sort: ['date:desc'], // Sort by date descending for newest first
    populate: {
      image: {
        fields: ['url', 'alternativeText', 'id', 'documentId']
      }
    },
  }, {
    encodeValuesOnly: true, // prettify URL
  });

  // Make the API call
  return await fetchData(url.href);
}

// Function to fetch a single portfolio item with full details
export async function getPortfolioItem(id: string) {
  const url = new URL(`/api/portfolios/${id}`, baseUrl);
  
  url.search = qs.stringify({
    populate: {
      image: {
        fields: ['url', 'alternativeText', 'id', 'documentId']
      }
    }
  }, {
    encodeValuesOnly: true,
  });

  return await fetchData(url.href);
}