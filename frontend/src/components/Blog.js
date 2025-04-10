import React, { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Anxiety: Signs, Symptoms, and Coping Strategies",
    excerpt: "Learn about the different types of anxiety disorders and effective ways to manage anxiety in daily life.",
    category: "Mental Health",
    author: "Dr. Sarah Johnson",
    date: "2025-02-01",
    readTime: "5 min read",
    image: "/images/understanding anxiety.jpg",
    featured: true
  },
  {
    id: 2,
    title: "The Science of Sleep and Mental Well-being",
    excerpt: "Discover how quality sleep affects your mental health and tips for better sleep hygiene.",
    category: "Wellness",
    author: "Dr. Michael Chen",
    date: "2025-01-28",
    readTime: "4 min read",
    image: "/images/mental health.jpg",
    featured: true
  },
  {
    id: 3,
    title: "Mindfulness Meditation: A Beginner's Guide",
    excerpt: "Start your mindfulness journey with these simple meditation techniques for stress relief.",
    category: "Mindfulness",
    author: "Emma Williams",
    date: "2025-01-25",
    readTime: "6 min read",
    image: "/images/mindful meditation.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Building Healthy Relationships",
    excerpt: "Learn the key elements of maintaining positive relationships for better mental health.",
    category: "Relationships",
    author: "Dr. Lisa Thompson",
    date: "2025-01-22",
    readTime: "7 min read",
    image: "/images/healthy relationship.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Stress Management in the Workplace",
    excerpt: "Practical tips for managing work-related stress and maintaining work-life balance.",
    category: "Stress Management",
    author: "Dr. Robert Clark",
    date: "2025-01-20",
    readTime: "5 min read",
    image: "/images/stress management.jpg",
    featured: false
  }
];

const categories = [
  "All",
  "Mental Health",
  "Wellness",
  "Mindfulness",
  "Relationships",
  "Stress Management"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Posts */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Mental Health Blog</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map(post => (
              <div key={post.id} className="relative group">
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <span className="text-sm text-white bg-indigo-600 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-200">
                      {post.readTime} • {post.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-indigo-600 font-medium">
                  {post.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {post.readTime} • {new Date(post.date).toLocaleDateString()}
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-500 font-medium text-sm">
                    Read more →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;