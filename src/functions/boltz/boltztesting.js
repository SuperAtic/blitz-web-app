import { reverseSwap } from "./handleClaim";

export default async function testBoltz() {
  await reverseSwap(
    {
      amount: Number(1000),
      description: "test",
    },
    "tlq1qqtr34wsx47n8jkhjdvfsetun495r55uuzevcfnh0k8ufrndm3jc86spdu6qw2rhlqn7ecvmp8nwgv2jsndwzjv8w5dqg6e42m"
  );
}
