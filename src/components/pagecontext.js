import { createContext } from "react";

/**
 * @typedef {string[]} PageContextType
 */

/**
 * Context for managing page navigation state
 * @type {import('react').Context<PageContextType>}
 */
const pageContext = createContext(['home', 'guilds']);

export default pageContext;
