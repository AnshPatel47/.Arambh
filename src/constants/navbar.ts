export interface NavSubItem {
  title: string;
  href: string;
  description: string;
  image: string;
}

export interface NavItem {
  title: string;
  href: string;
  items?: NavSubItem[];
}

export const navLinks: NavItem[] = [
  {
    title: "Consulting Services",
    href: "/services",
  },
  {
    title: "Resources",
    href: "/resources",
    items: [
      {
        title: "Blog & Articles",
        href: "/resources/blogs",
        description: "Industry news and updates",
        image: "/assets/images/blog_hero.webp",
      },
      {
        title: "Case Studies",
        href: "/resources/case_studies",
        description: "Real outcomes for our clients",
        image: "/assets/images/case_studies_hero.webp",
      },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];