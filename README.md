# prompt-library

A dynamic and searchable library of prompts designed for a variety of academic use cases, including structured information extraction, programming, research article indexing, and more. This project provides a web-based interface to view, sort, and filter prompts, along with documentation for easy integration and use.

## Creator

This dataset was created by the University of Basel's Research and Infrastructure Support RISE (rise@unibas.ch) in 2024. 

## Metadata Schema

Each prompt in the library is defined as a JSON object with the following fields:

```
{
  "prompt_id": "Unique identifier for the prompt",
  "title": "Short, descriptive title",
  "description": "Detailed explanation of the prompt",
  "category": "Thematic or functional category",
  "models": ["List of models"],
  "author": "Creator or contributor name",
  "prompt_text": "The actual text of the prompt",
  "expected_output": "Description of desired output",
  "use_case": "Application context",
  "input_type": "Input required (e.g., Text, Code)",
  "output_type": "Type of response (e.g., Narrative, Code)",
  "version_number": "Version of the prompt",
  "last_updated": "Date when the prompt was last updated",
  "license": "Terms of use",
  "export_format": ["Supported formats (e.g., JSON, YAML)"]
}
```

### Field Descriptions
1. `prompt_id` 
   1. Type: String
   2. Description: A unique identifier for the prompt.
   3. Example: `PROMPT-0001`

2. `title`
   1. Type: String
   2. Description: A short, descriptive title for the prompt.
   3. Example: `Creative Writing Starter`

3. `description`
   1. Type: String
   2. Description: A detailed explanation of the prompt’s purpose.
   3. Example: `Generate an engaging opening line for a short story.`

4. `category`
   1. Type: String
   2. Description: Thematic or functional category of the prompt.
   3. Example: `Creative Writing`

5. `models`
   1. Type: Array of Strings
   2. Description: Models associated with the prompt.
   3. Example: `["GPT-4o", "Claude 3 Haiku", "claude-3-5-sonnet-20240620"]`

6. `author`
   1. Type: String
   2. Description: Name of the creator or contributor of the prompt.
   3. Example: `Albert Müller`

7. `prompt_text`
   1. Type: String
   2. Description: The actual text of the prompt.
   3. Example: `Write a compelling opening line for a short story.`

8. `expected_output`
   1. Type: String
   2. Description: A description of the desired output from the prompt.
   3. Example: `A single sentence that hooks the reader.`

9. `use_case`
   1. Type: String
   2. Description: The primary application context of the prompt.
   3. Example: `Storytelling`

10. `input_type`
    1. Type: String
    2. Description: The type of input expected by the prompt.
    3. Example: `Text`

11. `output_type`
    1. Type: String
    2. Description: The type of output generated by the prompt.
    3. Example: `Narrative`

12. `version_number`
    1. Type: String
    2. Description: The version of the prompt.
    3. Example: `v1.0`

13. `last_updated`
    1. Type: String (ISO Date Format)
    2. Description: The last date the prompt was updated.
    3. Example: `2024-11-19`

14. `license`
    1. Type: String
    2. Description: The license under which the prompt is released.
    3. Example: `Creative Commons`

15. `export_format`
    1. Type: Array of Strings
    2. Description: Supported export formats for the prompt.
    3. Example: `["JSON", "YAML"]`

### Example Prompt JSON Object

```
{
  "prompt_id": "PROMPT-0001",
  "title": "Creative Writing Starter",
  "description": "Generate an engaging opening line for a short story.",
  "category": "Creative Writing",
  "models": ["story", "writing", "creative"],
  "author": "Hans Müller",
  "prompt_text": "Write a compelling opening line for a short story.",
  "expected_output": "A single sentence that hooks the reader.",
  "use_case": "Storytelling",
  "input_type": "Text",
  "output_type": "Narrative",
  "version_number": "v1.0",
  "last_updated": "2024-11-19",
  "license": "Creative Commons",
  "export_format": ["JSON", "YAML"]
}
```

## Adding prompts

This step-by-step guide explains how to add new prompts or update existing ones.

1. Clone this repo.
2. Open the `prompts.json` file in a code or text editor.
   - Each prompt is defined as a JSON object. Prompts are stored in an array.
3. Add a new prompt
   - Add a new JSON object at the end of the array but before the closing `]`.
   - Follow the metadata schema defined in the documentation. 
   - Ensure:
     - The `prompt_id` is unique (e.g., `PROMPT-0008`).
     - Fields like `models`, `export_format`, and `last_updated` follow the correct format.
4. Validate the JSON.
   - Use a JSON validator (e.g., https://jsonlint.com/) to ensure the prompts.json file is correctly formatted.
   - Common issues to check for missing commas between objects or unclosed braces or brackets.
5. Open a pull request.
   - The repository maintainer will review your pull request.
   - If approved, your changes will be merged into the main repository.

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.