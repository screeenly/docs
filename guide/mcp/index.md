---
description: Connect Claude, Cursor and other AI agents to screeenly through the MCP server.
---

# MCP server

screeenly runs an MCP server, so AI agents like Claude Code or Cursor can take screenshots, create PDFs and read rendered HTML.

## What you need

- An API token ([Authentication](/guide/api/introduction/authentication)). Create a separate token for each agent.

## Add the server to your client

The server speaks MCP over HTTP:

```text
https://3.screeenly.com/mcp
```

::: code-group

```bash [Claude Code]
claude mcp add --transport http screeenly https://3.screeenly.com/mcp \
  --header "Authorization: Bearer YOUR_API_TOKEN"
```

```json [Cursor]
{
    "mcpServers": {
        "screeenly": {
            "url": "https://3.screeenly.com/mcp",
            "headers": {
                "Authorization": "Bearer YOUR_API_TOKEN"
            }
        }
    }
}
```

:::

For Cursor, add the JSON to `.cursor/mcp.json`. Other clients work the same way: add a remote HTTP server with this URL and an `Authorization` header.

## Tools

| Tool | Description |
| --- | --- |
| `capture_screenshot` | Takes a screenshot (JPG, PNG, WebP) or creates a PDF of a URL or of HTML. Returns a download URL. |
| `get_rendered_html` | Returns the HTML of a page after its JavaScript ran. |
| `get_usage` | Returns the plan, the requests used this month, the monthly limit and the credit balance. |
| `list_recent_shots` | Lists your recent captures. |

The tools accept most [options of the API](/guide/api/available-endpoints/options). The agent sees a description of each option in the tool schema.

## Usage and limits

- Captures through MCP count toward your monthly usage and use credits like API requests. Results from the [cache](/guide/api/introduction/caching) are free.
- The same [rate limits](/guide/api/introduction/rate-limit) and [free plan limits](/guide/api/introduction/free-plan) apply.
- A token with only the `shot:read` ability can call `get_usage` and `list_recent_shots`, but can't create captures.
- Download URLs expire after 24 hours.

The request log in the app shows which captures came from MCP.

## Related

- [Authentication](/guide/api/introduction/authentication)
- [Free plan](/guide/api/introduction/free-plan)
