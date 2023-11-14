import type { Schema, Attribute } from '@strapi/strapi';

export interface DescriptionParagraphsDescriptionParagraphs
  extends Schema.Component {
  collectionName: 'components_description_paragraphs_description_paragraphs';
  info: {
    displayName: 'DescriptionParagraphs';
  };
  attributes: {
    DescriptionParagraph: Attribute.RichText;
  };
}

export interface ImageImage extends Schema.Component {
  collectionName: 'components_image_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    ImageMedia: Attribute.Media;
  };
}

export interface ResourcesResourceLink extends Schema.Component {
  collectionName: 'components_resources_resource_links';
  info: {
    displayName: 'Resource';
    description: '';
  };
  attributes: {
    ResourceTitle: Attribute.String;
    ResourceLink: Attribute.String;
  };
}

export interface TestimonialHandoutLinkLinkContent extends Schema.Component {
  collectionName: 'components_testimonial_handout_link_link_contents';
  info: {
    displayName: 'LinkContent';
  };
  attributes: {
    Title: Attribute.String;
    Link: Attribute.String;
  };
}

export interface TestimonialHandoutPdfPdfContent extends Schema.Component {
  collectionName: 'components_testimonial_handout_pdf_pdf_contents';
  info: {
    displayName: 'PDFContent';
  };
  attributes: {
    Title: Attribute.String;
    PDF: Attribute.Media;
  };
}

export interface TestimonialTestimonials extends Schema.Component {
  collectionName: 'components_testimonial_testimonials';
  info: {
    displayName: 'Testimonials';
    description: '';
  };
  attributes: {
    TestimonialOrHandoutTitle: Attribute.String;
    TestimonialOrHandoutLink: Attribute.String;
    TestimonialOrHandoutPDF: Attribute.Media;
  };
}

export interface VideoVideo extends Schema.Component {
  collectionName: 'components_video_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    VideoMedia: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'description-paragraphs.description-paragraphs': DescriptionParagraphsDescriptionParagraphs;
      'image.image': ImageImage;
      'resources.resource-link': ResourcesResourceLink;
      'testimonial-handout-link.link-content': TestimonialHandoutLinkLinkContent;
      'testimonial-handout-pdf.pdf-content': TestimonialHandoutPdfPdfContent;
      'testimonial.testimonials': TestimonialTestimonials;
      'video.video': VideoVideo;
    }
  }
}
