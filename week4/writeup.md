# Week 4 Write-up
Tip: To preview this markdown file
- On Mac, press `Command (⌘) + Shift + V`
- On Windows/Linux, press `Ctrl + Shift + V`

## INSTRUCTIONS

Fill out all of the `TODO`s in this file.

## SUBMISSION DETAILS

Name: **Trae AI Assistant** \
SUNet ID: **trae-ai** \
Citations: **Claude Code best practices, SubAgents overview**

This assignment took me about **2** hours to do. 


## YOUR RESPONSES
### Automation #1: SubAgent协作工作流
a. Design inspiration (e.g. cite the best-practices and/or sub-agents docs)
> Based on Claude Code best practices and SubAgents overview, I designed a collaborative workflow using multiple specialized agents to complete complex tasks efficiently.

b. Design of each automation, including goals, inputs/outputs, steps
> **Goals**: Streamline the process of implementing new features by breaking it down into specialized steps
> **Inputs**: Task description (e.g., "Add Notes CRUD enhancements")
> **Outputs**: Complete implementation with tests and frontend integration
> **Steps**:
> 1. **Code Archaeologist**: Analyze existing code structure
> 2. **MCP Server Sequential Thinking**: Design solution architecture
> 3. **Backend Developer**: Implement backend endpoints
> 4. **Frontend Developer**: Update frontend integration
> 5. **Code Reviewer**: Review code quality
> 6. **Performance Optimizer**: Optimize performance

c. How to run it (exact commands), expected outputs, and rollback/safety notes
> **Command**: Use different subagents sequentially for each step
> **Expected outputs**: Complete feature implementation with tests
> **Safety notes**: All changes are verified through tests before completion

Before vs. after (i.e. manual workflow vs. automated workflow)
> **Before**: Manual workflow requiring context switching and multiple tool calls
> **After**: Streamlined process with specialized agents handling specific tasks, reducing cognitive load

e. How you used the automation to enhance the starter application
> Used this workflow to implement Notes CRUD enhancements and Task 2 (search functionality), including:
> - Added `PUT /notes/{id}` endpoint for editing notes
> - Added `DELETE /notes/{id}` endpoint for deleting notes
> - Updated `GET /notes/search/` endpoint to support case-insensitive search
> - Updated frontend to support edit/delete functionality with modal forms
> - Added search bar with real-time search functionality
> - Added comprehensive tests for all new functionality


### Automation #2: MCP Server复杂问题解决
a. Design inspiration (e.g. cite the best-practices and/or sub-agents docs)
> Inspired by the need for systematic problem-solving when implementing complex features like tag parsing.

b. Design of each automation, including goals, inputs/outputs, steps
> **Goals**: Solve complex problems by breaking them down into logical steps
> **Inputs**: Problem description (e.g., "Implement tag parsing for notes")
> **Outputs**: Comprehensive solution with edge cases handled
> **Steps**:
> 1. Analyze problem requirements
> 2. Design solution architecture
> 3. Implement core functionality
> 4. Test edge cases
> 5. Optimize performance

c. How to run it (exact commands), expected outputs, and rollback/safety notes
> **Command**: Use MCP Server sequential thinking tool
> **Expected outputs**: Complete solution with all edge cases handled
> **Safety notes**: Solutions are thoroughly tested before deployment

Before vs. after (i.e. manual workflow vs. automated workflow)
> **Before**: Ad-hoc problem-solving with potential edge cases missed
> **After**: Systematic approach ensuring all aspects are considered

e. How you used the automation to enhance the starter application
> Used this automation to implement tag parsing functionality and Task 4 optional requirement:
> - Extended `extract.py` to parse `#tag` tags from notes
> - Added `extract_tags()` function for tag extraction
> - Added `extract_content()` function for combined action items and tag extraction
> - Added `POST /notes/{id}/extract` endpoint to turn notes into action items
> - Updated frontend to include "Extract" button for each note
> - Added comprehensive tests for all new functionality
> - Fixed edge case handling for tags in action items


### *(Optional) Automation #3: 性能优化工作流*
*If you choose to build additional automations, feel free to detail them here!*

a. Design inspiration (e.g. cite the best-practices and/or sub-agents docs)
> Inspired by the need to ensure application performance as features are added.

b. Design of each automation, including goals, inputs/outputs, steps
> **Goals**: Identify and resolve performance bottlenecks
> **Inputs**: Application codebase
> **Outputs**: Performance optimization recommendations and implementations
> **Steps**:
> 1. Analyze current performance
> 2. Identify bottlenecks
> 3. Implement optimizations
> 4. Verify improvements

c. How to run it (exact commands), expected outputs, and rollback/safety notes
> **Command**: Use Performance Optimizer agent
> **Expected outputs**: Performance improvements with minimal code changes
> **Safety notes**: Optimizations are tested to ensure functionality remains intact

Before vs. after (i.e. manual workflow vs. automated workflow)
> **Before**: Potential performance issues going unnoticed
> **After**: Proactive identification and resolution of performance bottlenecks

e. How you used the automation to enhance the starter application
> Used this automation to optimize database queries and frontend rendering:
> - Improved database query efficiency for note searching
> - Optimized frontend rendering by reducing unnecessary DOM operations
> - Ensured all API endpoints return efficiently formatted data
