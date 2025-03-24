// Function to split address at first comma
const splitAddress = (address) => {
  if (!address) return { main: "", detail: "" };
  const [main, ...rest] = address.split(",");
  return {
    main: main.trim(),
    detail: rest.join(",").trim(),
  };
};

export default splitAddress;
