using Microsoft.AspNetCore.Mvc;
using Server.Models;
using AI.Services;
using AI.Models;
using static AI.Models.HistoryInput;
using System.Collections.Generic;
using LLama.Common;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/Stream/[controller]")]
    public class HRController : ControllerBase
    {
        private readonly ILogger<HRController> _logger;
        private readonly ILlamaService _service;
        public HRController(ILogger<HRController> logger, ILlamaService llamaService)
        {
            _logger = logger;
            _service = llamaService;

        }


        private async IAsyncEnumerable<HRResponse> StreamFromServiceAsync(string prompt)
        {
            var chatHistory = new ChatHistory
            {
                Messages = new List<ChatHistory.Message>
                {
                    new ChatHistory.Message(AuthorRole.User, prompt)

                }
            };

            await foreach (var resPart in _service.SendStreamAsync(chatHistory))
            {
                yield return new HRResponse() { Text = resPart };
            }
        }


        [HttpPost("chatbot", Name = "AskChatbotQuestion")]
        [ProducesResponseType(typeof(HRResponse), StatusCodes.Status200OK, "application/json")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IAsyncEnumerable<HRResponse> AskChatbotQuestion([FromBody] ChatbotRequest request)
        {
            var prompt = $@"
                            You are a helpful assistant that uses the provided CV to help the user prepare for a job interview. Provide detailed, tailored answers to their questions based on the CV.

                            Limit your response to a maximum of 10 to 15 sentences.

                            CV:
                            {request.Cv}

                            Question:
                            {request.Question}";

            return StreamFromServiceAsync(prompt);
        }



        [HttpPost("competences", Name = "AskForKeyCompetences")]
        [ProducesResponseType(typeof(HRResponse), StatusCodes.Status200OK, "application/json")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IAsyncEnumerable<HRResponse> AskForKeyCompetences([FromBody] HRRequest request)
        {            
            
            var prompt = $"Based on the following CV list 3 to 5 competences of the person in markdown format. Only write the competences and nothing else! Keep the answer short and avoid repeating information.\n{request.Cv}";

            return StreamFromServiceAsync(prompt);
        }

        [HttpPost("positions", Name = "AskForSuggestedPositions")]
        [ProducesResponseType(typeof(HRResponse), StatusCodes.Status200OK, "application/json")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IAsyncEnumerable<HRResponse> AskForSuggestedPositions([FromBody] HRRequest request)
        {
            var prompt = $"Based on the following CV, please recommend 3 positions that the applicant could fill. Only write the 3 positions in markdown list format and nothing else! Keep the answer short.\n{request.Cv}";

            return StreamFromServiceAsync(prompt);
        }

        [HttpPost("data", Name = "AskForDataTable")]
        [ProducesResponseType(typeof(HRResponse), StatusCodes.Status200OK, "application/json")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IAsyncEnumerable<HRResponse> AskForDataTable([FromBody] HRRequest request)
        {
            var prompt = $"Based on the following CV collect the most important informations about the applicant into a table in markdown format. Only return the table and nothing else! Keep the answer short and avoid repeating information.\n{request.Cv}";

            return StreamFromServiceAsync(prompt);
        }

        [HttpPost("questions", Name = "AskForInterviewQuestions")]
        [ProducesResponseType(typeof(HRResponse), StatusCodes.Status200OK, "application/json")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IAsyncEnumerable<HRResponse> AskForInterviewQuestions([FromBody] HRRequest request)
        {
            var prompt = $"Based on the following CV suggest relevant questions to ask the applicant during the job interview. Only return the questions in markdown list format and nothing else! Keep the answer short and avoid repeating information.\n{request.Cv}";

            return StreamFromServiceAsync(prompt);
        }

        [HttpPost("invitation", Name = "AskForInvitationLetter")]
        [ProducesResponseType(typeof(HRResponse), StatusCodes.Status200OK, "application/json")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IAsyncEnumerable<HRResponse> AskForInvitationLetter([FromBody] HRRequest request)
        {
            var prompt = $"Generate an invitation letter for a job interview for the applicant, who is the person in the CV. Only return the letter of invitation and nothing else before or after the letter! Start the letter with greeting. Keep the answer short and avoid repeating information.\n{request.Cv}";

            return StreamFromServiceAsync(prompt);
        }
    }
}
