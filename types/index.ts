export interface HeaderData {
  title: string;
  paragraph: string;
}

export interface AboutData {
  paragraph: string;
  Why: string[];
  Why2: string[];
}

export interface ServiceData {
  icon: string;
  name: string;
  text: string;
}

export interface GalleryData {
  title: string;
  largeImage: string;
  smallImage: string;
}

export interface TestimonialData {
  img: string;
  text: string;
  name: string;
}

export interface TeamMember {
  img: string;
  name: string;
  job: string;
}

export interface ContactData {
  address: string;
  phone: string;
  email: string;
  instagram: string;
  twitter: string;
  Thread: string;
}

export interface LandingPageData {
  Header: HeaderData;
  About: AboutData;
  Services: ServiceData[];
  Gallery: GalleryData[];
  Testimonials: TestimonialData[];
  Team: TeamMember[];
  Contact: ContactData;
}
