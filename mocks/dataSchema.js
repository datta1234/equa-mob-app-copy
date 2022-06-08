const schema = {
  reports: {
    type: 'array',
    minItems: 5,
    maxItems: 10,
    items: {
      id: {
        type: 'integer',
        unique: true,
        minimum: 1,
        maximum: 1000,
      },
      title: {
        enum: ['production', 'azure data', 'azure data 2'],
      },
      logo: 'https://picsum.photos/200',
    },
  },
};

module.exports = schema;
