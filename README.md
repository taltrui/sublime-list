## Live Demo

[View Live Application](https://sublime-list.vercel.app/)

## Architecture & Approach

### Key Technical Decisions

**Framework Choice: TanStack Start**

- Chose TanStack Start mostly for my familiarity with the TanStack ecosystem
- It has a great file-based routing for simplicity and scalability
- SSR support is very good
- Built-in support for TanStack Query for data fetching and caching which makes it very easy to implement any API integration

**State Management: TanStack Query**

- I used TanStack Query for all data fetching and caching
- No need for global state management libraries like Redux or Zustand
- Automatic caching, background refetching, and pagination support
- Tight integration with TanStack Start for server-side data fetching

**Styling: Tailwind CSS**

- Choose Tailwind for its ease to use and built-in utilities
- Easier to be consistent with design
- Responsive design with minimal custom CSS

**Type Safety: TypeScript + Zod**

- Used TypeScript for static type checking
- Zod for runtime validation of API responses and server functions

**Other choices and tools:**
- **Linting**: Biome for consistent code style and error detection
- **Git Hooks**: Lefthook for pre-commit quality checks
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Error Boundaries**: Graceful error handling and user feedback
- **Vercel**: Deployed on Vercel

### Component Architecture

```
src/
├── components/                     # Reusable UI components
│   ├── CardList/                   # Virtual scrolling card list
│   │   └── components/
│   │       ├── cardTypes/          # Card content types
│   │       ├── CardContent.tsx     # Card content rendering
│   │       └── CardListItem.tsx    # Wrapper for card item
│   └── ui/                         # Base UI components
├── lib/                            # Utility functions
│   ├── api.ts                      # HTTP client configuration
│   ├── utils.ts                    # URL parsing and domain extraction
│   └── videos.ts                   # Video platform integrations
├── queries/                        # React Query hooks
├── serverFunctions/                # Server-side functions
├── routes/                         # Routing
└── types/                          # Type definitions
```

I've decided to create a CardList component that virtualizes all cards using `@tanstack/react-virtual`. This allows us to handle large lists efficiently without performance issues. Each card type (Social, Article, Image, Video and Post) is implemented as a separate component for easier maintenance and clearer separation of concerns.

The CardList is used in both the index route and the card detail route, allowing for consistent rendering and interaction patterns across the application.

### Routing & Navigation

- We have an index route (`/`) that displays the card list
- Each card has a detail page (`/card/:id`) for viewing full content
- Each card can be clicked to navigate to its detail page
- In the card detail, related cards can be clicked to navigate to their detail pages as well

## How to Run Locally

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/sublime-list.git
cd sublime-list

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://54.198.139.161/api
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm check` - Run linting and formatting checks

## Performance Optimizations

### 1. Virtual Scrolling

- Implemented `@tanstack/react-virtual` for efficient rendering of large card lists

### 2. Infinite Scrolling with Smart Pagination

- TanStack Query's `useInfiniteQuery` for handling pagination in both card list and related cards
- Automatic loading of next pages as user scrolls

### 3. Image Optimization

- Lazy loading with native `loading="lazy"` attribute
- Responsive image sizing based on device capabilities

### 4. Code Splitting & SSR

- Route-level code splitting with TanStack Start
- Server-side rendering for improved initial page load

### 5. Caching Strategy

- Cache is handled by TanStack Query
- Since we are not modifying the data, there is no cache invalidation needed

### 6. Video Platform Optimization

- Lazy loading of video embeds (YouTube, Vimeo, TikTok, Loom, SoundCloud)
- I added a thumbnail overlay to prevent initial video loading, which improves performance and user experience.

## Challenges Faced & Solutions

### 1. Video Platform Integration

**Challenge**: There were multiple video platforms with different embed requirements

**Solution**: I created a unified video component with platform-specific handlers and lazy loading strategies

### 2. Initial video loading

**Challenge**: Videos were loading immediately, causing performance issues and stuttering in the UI.

**Solution**: Implemented a thumbnail overlay that loads the video only when clicked.

## Future Improvements

Given more time, I would implement:

- **Service Worker**: Offline support and background sync
- **Web Vitals Monitoring**: Real-time performance tracking
- **Search & Filtering**: Full-text search and filtering capabilities
- **Bookmarking System**: Save and organize favorite cards
- **Keyboard Navigation**: Complete keyboard accessibility
- **Dark Mode**: User preference-based theming
- **E2E Testing**: Playwright tests for critical user flows
- **Advanced Analytics**: User interaction tracking
- **Database Integration**: Persistent user data and preferences
- **Authentication**: User accounts and personalization
- **Design improvements**: Improve UI/UX, mostly card design, although it is functional and responsive, it could be more visually appealing.
