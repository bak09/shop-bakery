# Shop-Bakery (React SPA)

## Project Description (Proposal)
Shop-Bakery is a Single Page Application for browsing bakery products and simulating a simple “add to cart” flow. The purpose is to provide a fast, clean user experience where users can explore popular baked goods without page reloads.  
Target audience: people who order desserts online (students, office workers, local residents).  
Problem solved: saves time and simplifies product selection and ordering.  
MVP features: Home page, popular products list, header/footer layout, basic UI styling, and a placeholder “Add to cart” action.

---

## SPA Theory Questions

### 1) What is a Single Page Application (SPA)?
A Single Page Application (SPA) is a web app that loads a single HTML page and updates the content dynamically as the user interacts with it. Instead of requesting a new page from the server each time, SPA uses JavaScript to render new UI views on the client side. It typically communicates with the server using APIs (e.g., REST) to fetch data. The user experience feels faster because navigation does not fully reload the page. React is commonly used to build SPAs because it simplifies UI updates. SPAs are good for interactive applications like dashboards, shops, and social apps.

### 2) How does SPA differ from traditional Multi-Page Applications (MPA)?
In an MPA, each navigation usually loads a new HTML page from the server, causing full page reloads. In a SPA, the application updates parts of the page without reloading the whole document. MPAs rely more on server-side rendering per page, while SPAs rely more on client-side rendering. SPAs often feel more responsive after the initial load. MPAs can be simpler for SEO and can load faster on first request depending on implementation. SPAs often require routing libraries and careful state management. Both approaches are valid depending on the project needs.

### 3) What is the Virtual DOM?
The Virtual DOM is a lightweight, in-memory representation of the real DOM. React uses it to compute the minimal set of changes needed when state or props update the UI. Instead of updating the real DOM directly for every small change, React compares the new Virtual DOM with the previous one (diffing). Then it applies only the necessary updates to the real DOM (reconciliation). This reduces expensive DOM operations and improves performance. It also makes UI updates more predictable and easier to manage.

### 4) Why does React use a component-based architecture?
Component-based architecture breaks the UI into small, reusable pieces called components. Each component can manage its own structure and behavior, making the code easier to maintain. Components can be reused across pages, reducing duplication. This approach also makes teamwork easier because different developers can work on different components. Components improve scalability because complex apps can be built by composing many smaller parts. In React, components work well with state and props to create dynamic interfaces.

---

## Run the Project
```bash
npm install
npm start
```

## Screenshot
After running the app, add your screenshot here:

![App Screenshot](./screenshot.png)
