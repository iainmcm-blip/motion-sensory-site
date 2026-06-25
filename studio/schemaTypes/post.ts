export default {
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    { name: 'title',       title: 'Title',                type: 'string' },
    { name: 'slug',        title: 'Slug',                 type: 'slug',     options: { source: 'title' } },
    { name: 'publishedAt', title: 'Published at',         type: 'datetime' },
    { name: 'excerpt',     title: 'Excerpt',              type: 'text',     rows: 3 },
    { name: 'category',    title: 'Category',             type: 'string',   options: { list: ['Sensory Science', 'Brand Strategy', 'Experience Design', 'Olfactory Design'] } },
    { name: 'readTime',    title: 'Read Time (minutes)',  type: 'number' },
    { name: 'featured',    title: 'Featured',             type: 'boolean',  initialValue: false },
    { name: 'author',      title: 'Author',               type: 'string' },
    { name: 'coverImage',  title: 'Cover Image',          type: 'image',    options: { hotspot: true } },
    {
      name: 'body', title: 'Body', type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link', type: 'object', title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }]
              },
              {
                name: 'textColor', type: 'object', title: 'Text Colour',
                fields: [
                  {
                    name: 'color', type: 'string', title: 'Colour',
                    options: {
                      list: [
                        { title: 'Black',      value: '#111111' },
                        { title: 'Dark Grey',  value: '#444444' },
                        { title: 'Mid Grey',   value: '#888888' },
                        { title: 'White',      value: '#ffffff' },
                        { title: 'Brand Gold', value: '#C4922A' },
                        { title: 'Warm Sand',  value: '#D4B896' },
                        { title: 'Deep Navy',  value: '#1A2B4A' },
                        { title: 'Teal',       value: '#2A7A8C' },
                      ]
                    }
                  }
                ]
              }
            ]
          }
        },
        { type: 'image', options: { hotspot: true } }
      ]
    },
  ],
  orderings: [
    { title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}
