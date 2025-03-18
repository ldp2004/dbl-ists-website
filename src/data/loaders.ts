import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

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
    const response = await fetch(url, {
      ...authToken ? headers : {},
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ['strapi-data'], // Add cache tag for manual revalidation
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getGlobalData() {
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

  return await fetchData(url.href);
}

export async function getGlobalPageMetadata() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    fields: ["title", "description"],
  });

  return await fetchData(url.href);
}

export async function getHomePageData() {
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
}

export async function getServicePageData() {
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
}

export async function getAboutPageData() {
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