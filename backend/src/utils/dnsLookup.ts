import dns from "dns";

// Check what is the ip address of a specific domain
export const dnsLookup = (domain: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address, _family) => {
      if (err) reject(err);
      resolve(address);
    });
  });
};
