db.books
  .find({
    rating: {
      $gte: 8,
      $lte: 9,
    },
  })
  .sort({ rating: 1 });

  /** Find + Projection + Sort */
  // find books with rating greater than 8, only show title and rating fields, sort by rating ascending
db.books
  .find({ rating: { $gt: 8 } }, { title: 1, rating: 1, _id: 0 })
  .sort({ rating: 1 });
