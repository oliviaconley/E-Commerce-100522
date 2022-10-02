const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product , through: ProductTag}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product , through: ProductTag}],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.json(deletedTag)} catch(err) {
    res.json(err)
  }
});

module.exports = router;
