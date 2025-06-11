import { reverseSwap } from "./handleClaim";

export default async function testBoltz() {
  await reverseSwap(
    {
      amount: Number(1000),
      description: "test",
    },
    "VJL86UqrXEq4tvGBgeqS52A3iLEvQvDUVN2Rt8cWHeE4NQJtnLNQm9Bv7YD5pWUmGLEkt6xeAZXtHnnt"
    // "tlq1qqtr34wsx47n8jkhjdvfsetun495r55uuzevcfnh0k8ufrndm3jc86spdu6qw2rhlqn7ecvmp8nwgv2jsndwzjv8w5dqg6e42m"
    //VJL86UqrXEq4tvGBgeqS52A3iLEvQvDUVN2Rt8cWHeE4NQJtnLNQm9Bv7YD5pWUmGLEkt6xeAZXtHnnt
  );
}
