from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textwrap import dedent
from agno.agent import Agent
from agno.tools.serpapi import SerpApiTools
from agno.models.openai import OpenAIChat
from typing import Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FinancialRequest(BaseModel):
    openai_api_key: str
    serp_api_key: str
    financial_goals: str
    current_situation: str

class FinancialResponse(BaseModel):
    plan: str

@app.post("/generate-plan", response_model=FinancialResponse)
async def generate_financial_plan(request: FinancialRequest):
    try:
        # Initialize the agents
        researcher = Agent(
            name="Researcher",
            role="Searches for financial advice, investment opportunities, and savings strategies based on user preferences",
            model=OpenAIChat(id="gpt-4o", api_key=request.openai_api_key),
            description=dedent(
                """\
            You are a world-class financial researcher. Given a user's financial goals and current financial situation,
            generate a list of search terms for finding relevant financial advice, investment opportunities, and savings strategies.
            Then search the web for each term, analyze the results, and return the 10 most relevant results.
            """
            ),
            instructions=[
                "Given a user's financial goals and current financial situation, first generate a list of 3 search terms related to those goals.",
                "For each search term, `search_google` and analyze the results.",
                "From the results of all searches, return the 10 most relevant results to the user's preferences.",
                "Remember: the quality of the results is important.",
            ],
            tools=[SerpApiTools(api_key=request.serp_api_key)],
            add_datetime_to_instructions=True,
        )

        planner = Agent(
            name="Planner",
            role="Generates a personalized financial plan based on user preferences and research results",
            model=OpenAIChat(id="gpt-4o", api_key=request.openai_api_key),
            description=dedent(
                """\
            You are a senior financial planner. Given a user's financial goals, current financial situation, and a list of research results,
            your goal is to generate a personalized financial plan that meets the user's needs and preferences.
            """
            ),
            instructions=[
                "Given a user's financial goals, current financial situation, and a list of research results, generate a personalized financial plan that includes suggested budgets, investment plans, and savings strategies.",
                "Ensure the plan is well-structured, informative, and engaging.",
                "Ensure you provide a nuanced and balanced plan, quoting facts where possible.",
                "Remember: the quality of the plan is important.",
                "Focus on clarity, coherence, and overall quality.",
                "Never make up facts or plagiarize. Always provide proper attribution.",
            ],
            add_datetime_to_instructions=True,
        )

        # Generate the financial plan
        response = planner.run(
            f"Financial goals: {request.financial_goals}, Current situation: {request.current_situation}",
            stream=False
        )

        return FinancialResponse(plan=response.content)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 