export const fetchSkips = async () => {
  const res = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft");
  const data = await res.json();
  return data;
};
