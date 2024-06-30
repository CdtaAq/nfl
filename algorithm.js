// Organize players into position arrays
let qb = [];
let wr = [];
let rb = [];
let te = [];

playersData.forEach(player => {
  switch (player.position) {
    case "QB":
      qb.push(player);
      break;
    case "WR":
      wr.push(player);
      break;
    case "RB":
      rb.push(player);
      break;
    case "TE":
      te.push(player);
      break;
    default:
      break;
  }
});
