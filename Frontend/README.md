# Coy Discover Swipe Feature - React Frontend

This project implements the frontend components designed in Stitch for **Coy** (`https://stitch.google.com/projects/15860739713238024040`).

Built with React 18, Vite, and Tailwind CSS using a **Playful Neo-Brutalist** design system.

---

## 🎨 Stitch Project Details
- **Project ID**: `15860739713238024040`
- **Project Name**: `Coy Discover Swipe Feature`
- **Design Theme**: Playful Neo-Brutalist Discovery
  - **Colors**: Primary Coy Pink (`#FF347D` / `#b70052`), Soft Peach (`#FFE0D0`), Soft Lavender (`#E8E0FF`), Deep Plum Neutral (`#19151F` / `#1e1a24`)
  - **Typography**: Plus Jakarta Sans
  - **Borders & Shadows**: Tactile 2px solid borders with hard offset neo-brutalist shadows (`shadow-[3px_3px_0px_#1e1a24]`)

---

## 🧩 Components Created

| Component | Stitch Screen | Description |
|-----------|---------------|-------------|
| `<DiscoverSwipeProfile />` | `Discover - Swipe Profile` | Neo-brutalist swipeable profile card stack with photo carousel counter, status badge ("New here"), dynamic feedback stamps (`LIKE ❤️`, `PASS ✕`, `SUPER ⭐`), location pill, and quick action buttons. |
| `<DiscoverProfileDetails />` | `Discover - Profile Details` | Full crush reveal screen featuring stories-style tap photo carousel, mutual distance & circle tags, interactive "Coy Secret Hint" with Peek reveal, personality prompts, and sticky bottom interaction dock with celebration modal. |
| `<DiscoverItsAMatch />` | `Discover - It's a Match!` | Celebration screen with floating Memphis confetti background, overlapping avatars with bouncing match heart connector, icebreaker hint with one-tap quick-fill prompts, and message input. |
| `<DiscoverEmptyState />` | `Discover - Empty State` | "You've seen everyone!" screen with tilted card stack, interactive animated SVG mascot (cool heart with retro shades & wink), daily discovery statistics grid (Explored, Liked, Mutual), and refresh button. |
| `<FilterModal />` | Custom Neo-Brutalist Modal | Interactive preferences modal for adjusting distance range, age range, and shared interests. |
| `<Header />` & `<BottomNav />` | Navigation Shells | Mobile fixed header and navigation bars with Coy branding. |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📱 Interactive Preview Features
- **Quick-Switcher Bar**: Use the top pill switcher bar to instantly preview any of the 4 Stitch screens (`Swipe`, `Details`, `Match`, `Empty`).
- **Full User Flow**:
  1. Swipe or click Like / Superlike on a profile to trigger the **Match** screen.
  2. Tap the card body or "Tap to view full profile & prompts" to open **Profile Details**.
  3. In Profile Details, tap photos left/right for stories navigation, click "Peek" to unblur the secret hint, like individual prompts, or send a like.
  4. Pass all profiles to reach the **Empty State**, then tap "Refresh discovery" to reset and start exploring again!
