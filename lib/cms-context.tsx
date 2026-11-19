"use client";

import { createContext, useContext } from "react";
import type { ContentSection, SiteContent } from "./site-content";

export const SiteContentContext = createContext<SiteContent>({});
export const ContentSectionContext = createContext<ContentSection>("siteSettings");
export const useSiteContent = () => useContext(SiteContentContext);
export const useContentSection = () => useContext(ContentSectionContext);
