const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

 // find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
   try {const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.json(deletedCategory)} catch(err) {
    res.json(err)
  }
});

module.exports = router;
