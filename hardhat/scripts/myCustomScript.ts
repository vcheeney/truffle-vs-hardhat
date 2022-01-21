async function main() {
  console.log("Hello world!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
