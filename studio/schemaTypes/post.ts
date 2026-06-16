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
    { name: 'body',        title: 'Body',                 type: 'array',    of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
  ],
  orderings: [
    { title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}
