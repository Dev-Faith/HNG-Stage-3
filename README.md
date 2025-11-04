## 🧠 CodeHelper AI Agent (HNG Stage 3 Backend Task)

This project implements the **CodeHelper**, an expert $\text{AI}$ agent designed to assist developers on the **Telex.im** platform by executing code snippets and providing expert technical guidance. It serves as a real-time debugging and information tool.

The agent is deployed as a high-performance backend service that complies with the **Agent-to-Agent ($\text{A2A}$) Protocol**.

### Key Technologies

  * **Backend Framework:** NestJS (TypeScript)
  * **Agent Framework:** Mastra
  * **LLM Provider:** Groq (using Llama 3.1-8b-instant for low-latency inference)
  * **Integration Protocol:** $\text{JSON-RPC}$ 2.0 / **Telex $\text{A2A}$ Protocol**
  * **Hosting:** Railway (or any public $\text{HTTPS}$ host)

-----

## 🏗️ Architecture and Flow

The application structure separates the $\text{AI}$ logic from the network interface to ensure modularity and clean protocol handling:

1.  **A2aController:** This NestJS controller handles the $\text{HTTP}$ interface. It serves the **Agent Card** metadata (Discovery Endpoint) at `/.well-known/agent.json` and processes all incoming $\text{JSON-RPC}$ requests (Communication Endpoint) at `/:agentId`.
2.  **MastraService:** This service acts as the orchestrator. It initializes the **Mastra Agent** and provides a wrapper method (`processMessage`) that takes the raw user text from the $\text{A2A}$ request and feeds it into the $\text{LLM}$'s generation process.
3.  **CodeExecutor Tool:** This is a custom function (tool) defined within Mastra. The $\text{LLM}$ calls this tool when a user asks to run code. It securely executes the provided JavaScript/TypeScript snippet and returns the resulting value.
4.  **Groq/Llama 3:** The Mastra framework routes the prompt and necessary context, including tool-use decisions, to the high-speed Groq $\text{API}$ for rapid reasoning and response generation.

-----

## ⚙️ Local Setup and Installation

Follow these steps to get the project running on your local machine.

### 1\. Prerequisites

You must have the following installed:

  * Node.js (v18+)
  * npm or yarn
  * NestJS CLI (`npm install -g @nestjs/cli`)

### 2\. Clone the Repository and Install

```
git clone https://github.com/Dev-Faith/HNG-Stage-3.git
cd HNG-Stage-3
npm install
```

### 3\. Configure Environment Variables

Create a file named **.env** in the project root and populate it with your credentials and configuration details. These must be set on your deployment platform as well.

```
# .env file

# 1. Groq API Key (Required for Llama 3)
GROQ_API_KEY="gsk_YourCopiedKeyHere"

# 2. Public URL (Used by the Agent Card JSON; use localhost for local testing)
AGENT_PUBLIC_URL="http://localhost:3000"

# 3. Agent Identifier (Must match the ID used in the A2aController)
AGENT_ID="code-helper-agent"
```

### 4\. Run the Application

```
npm run start:dev
```

The application will start on `http://localhost:3000`.

-----

## 🧪 Local Testing (Thunder Client / Postman)

You must verify the $\text{A2A}$ protocol compliance locally before deployment.

### 1\. Test Discovery Endpoint (GET)

  * **URL:** `http://localhost:3000/.well-known/agent.json`
  * **Verification:** Confirm the $\text{JSON}$ response contains all required fields, including the $\text{HTTPS}$ URL placeholder and the **`short_description`**.

### 2\. Test Communication Endpoint (POST)

Simulate a user message using a $\text{JSON-RPC}$ request.

  * **Method:** $\text{POST}$
  * **URL:** `http://localhost:3000/code-helper-agent`

**Sample Request Body (JSON-RPC 2.0):**

```json
{
    "jsonrpc": "2.0",
    "method": "message/send",
    "params": {
        "channel_id": "test-channel-123",
        "message": {
            "text": "CodeHelper, what is the result of 99 + 1?"
        }
    },
    "id": "123456"
}
```

**Verification:** The response must be an $\text{HTTP}$ 200 with a $\text{JSON-RPC}$ payload that contains the agent's reply nested correctly under the **`result.actions`** structure and mirrors the original **`id`**.

-----

## 🔗 Deployment and Telex Integration

### 1\. Deployment

Deploy the application to a public cloud host (e.g., Railway). **Crucially**, ensure the production environment variable `AGENT_PUBLIC_URL` is updated to your **$\text{HTTPS}$ domain** (e.g., `https://hng-stage-3-production-f2bf.up.railway.app`).

### 2\. Telex Registration

Once deployed and confirmed to be using $\text{HTTPS}$, use the **Agent Discovery URL** to register the agent on the Telex platform:

  * **Registration URL:** `https://[Your-Deployed-Domain]/.well-known/agent.json`