export type BlogPostDTO = {
    title: string;
    short_description: string;
    content: string;
    featured_image_url: string;
    url_handle: string;
    publish_date: Date;
    author: string;
    is_visible: boolean;
}

export type BlogPostModel = {
    id: string;
    title: string;
    short_description: string;
    content: string;
    featured_image_url: string;
    url_handle: string;
    publish_date: Date;
    author: string;
}