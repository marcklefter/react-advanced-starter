# Exercise: React Context.
When using React Context in an application, special attention must be paid to avoid unnecessary rerenders.

In the `context` example, the first version - `App1` - demonstrates this:

*   Application state, composed of "login" and "theme" state, is managed by a single `AppContext` and rendered by an `AppProvider` component. Two components, `Login` and `ThemeSelector`, consume the context so each can get their required part of the state.

*   When the theme is switched, the entire application should rerender to reflect the new theme. This works properly.

*   However, when the user logs in / out, only the Login component should be affected; currently however, _both_ Login and ThemeSelector rerender (as displayed in the console).

## Part 1 - Split contexts.
One way to solve this is to split the overall state into two separate contexts, one for login and one for theme, and have the Login and Theme consume each context accordingly.

In `App2`, implement this solution by having an `AuthContext` (and `AuthProvider`) as well as a `ThemeContext` (and `ThemeProvider`). Verify in the console.

## Part 2 - Wrapper component.
Sometimes splitting a context isn't always feasible (especially if there are state interdependencies), so another solution is to main a single (or a few) contexts with application state and _intercept_ possible rerenders by _wrapping_ affected components.

In this example, to avoid rerendering the ThemeSelector component, wrap it a separate component called `ThemeSelectorWrapper`; let this wrapper component consume the AppContext to get the theme state. Then _forward the theme state as props_ to ThemeSelector and ensure that it only rerenders _if the props have changed_.

Implement this solution in `App3`. 