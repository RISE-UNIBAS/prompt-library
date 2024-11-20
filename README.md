# prompt-library

A dynamic and searchable library of prompts designed for a variety of academic use cases, including structured information extraction, programming, research article indexing, and more. This project uses GitHub pages to provide a [web-based interface to view, sort, and filter prompts](https://rise-unibas.github.io/prompt-library/), along with documentation for easy integration and use.

## Overview

- [Creator](#creator)
- [Metadata schema](#metadata-schema)
- [Adding prompts](#adding-prompts)
- [License](#license)

## Creator

This dataset was created by the University of Basel's Research and Infrastructure Support RISE (rise@unibas.ch) in 2024. 

## Metadata Schema

Each prompt in the library is defined as a JSON object with the following fields:

```
{
  "dcterms:identifier": "Unique identifier for the prompt",
  "dcterms:title": "Short, descriptive title for the prompt",
  "dcterms:description": "Detailed explanation of the prompt's purpose, including expected output",
  "dcterms:subject": "Thematic or functional category of the prompt",
  "dcterms:relation": "[List of models associated with the prompt]",
  "dcterms:creator": "Name of the creator or contributor of the prompt",
  "prompt_text": "The actual text of the prompt",
  "dcterms:hasPart": "Resources referenced in the prompt",
  "dcterms:type": "The type or role of the prompt",
  "input_example": "An instance of the prompt text where variables have been replaced",
  "output_example": "An example of an output given the input, either as text or reference to a file",
  "dcterms:hasVersion": "The version of the prompt",
  "dcterms:modified": "Date when the prompt was last updated in ISO format",
  "dcterms:rights": "The license under which the prompt is released",
  "dcterms:isPartOf": "The prompt was created and used in this (research) project"
}
```
The `dcterms:` prefix in the JSON refers to the [DCMI Metadata Terms](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/) namespace. It is used to distinguish standard metadata terms defined by the Dublin Core Metadata Initiative (DCMI) from other terms or custom metadata fields.

### Field Descriptions

| **Field**             | **Type**                 | **Description**                                                                               | **Example**                                                                                                                                                    |
|-----------------------|--------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dcterms:identifier`  | String                   | A unique identifier for the prompt.                                                           | `PROMPT-0001`                                                                                                                                                  |
| `dcterms:title`       | String                   | A short, descriptive title for the prompt.                                                    | `Image Description Generator`                                                                                                                                  |
| `dcterms:description` | String                   | A detailed explanation of the prompt's purpose.                                               | `Generate a detailed textual description of an image, capturing key elements.`                                                                                 |
| `dcterms:subject`     | String                   | Thematic or functional category of the prompt.                                                | `Image Analysis`                                                                                                                                               |
| `dcterms:relation`    | Array of Strings         | Models associated with the prompt.                                                            | `["GPT-4o", "Claude 3 Haiku", "claude-3-5-sonnet-20240620"]`                                                                                                   |
| `dcterms:creator`     | String                   | Name of the creator or contributor of the prompt.                                             | `Maximilian Hindermann`                                                                                                                                        |
| `prompt_text`         | String                   | The actual text of the prompt. Use curly brackets to indicate variables.                      | `Given {image}, generate a detailed description capturing its key features and context.`                                                                       |
| `dcterms:hasPart`     | URL                      | URL to a folder containing resources referenced in the prompt such as PDFs, images, or JSONs. | `https://github.com/RISE-UNIBAS/prompt-library/blob/main/resources/prompt-0001`                                                                                |
| `dcterms:type`        | String                   | The type or role of the prompt. Valid values are `user`, `system`, `refinement`.              | `user`                                                                                                                                                         |
| `input_example`       | String                   | An instance of `prompt_text` where variables have been replaced with references to resources. | `Given https://github.com/RISE-UNIBAS/prompt-library/resources/prompt-0001/image.jpg, generate a detailed description capturing its key features and context.` |
| `output_example`      | String or URL            | An example of an output given `input_example` either as text or as reference to a file.       | `This image is an intricate and imaginative artwork blending medieval manuscript aesthetics with space exploration themes.`                                    |
| `dcterms:hasVersion`  | String                   | The version of the prompt.                                                                    | `v1.0`                                                                                                                                                         |
| `dcterms:modified`    | String (ISO Date Format) | The last date the prompt was updated.                                                         | `2024-11-19`                                                                                                                                                   |
| `dcterms:rights`      | String                   | The license under which the prompt is released.                                               | `CC BY 4.0`                                                                                                                                                    |
| `dcterms:isPartOf`    | String or URL            | The prompt was created and used in this (research) project.                                   | `https://github.com/RISE-UNIBAS/prompt-library`                                                                                                                |

### Example Prompt JSON Object

```
{
  "dcterms:identifier": "PROMPT-0001",
  "dcterms:title": "Image Description Generator",
  "dcterms:description": "Generate a detailed textual description of an image, capturing key elements.",
  "dcterms:subject": "Image Analysis",
  "dcterms:relation": ["GPT-4o", "Claude 3 Haiku", "claude-3-5-sonnet-20240620"],
  "dcterms:creator": "Maximilian Hindermann",
  "prompt_text": "Given {image}, generate a detailed description capturing its key features and context.",
  "dcterms:hasPart": "https://github.com/RISE-UNIBAS/prompt-library/blob/main/resources/prompt-0001",
  "dcterms:type": "user",
  "input_example": "Given https://github.com/RISE-UNIBAS/prompt-library/resources/prompt-0001/image.jpg, generate a detailed description capturing its key features and context.",
  "output_example": "This image is an intricate and imaginative artwork blending medieval manuscript aesthetics with space exploration themes.",
  "dcterms:hasVersion": "v1.0",
  "dcterms:modified": "2024-11-19",
  "dcterms:rights": "CC BY 4.0",
  "dcterms:isPartOf": "https://github.com/RISE-UNIBAS/prompt-library"
}
```

## Adding prompts

This step-by-step guide explains how to add new prompts to this project.

1. Clone this repo.
2. Open the `prompts.json` file in a code or text editor.
   - Each prompt is defined as a JSON object. Prompts are stored in an array.
3. Add a new prompt
   - Add a new JSON object at the end of the array but before the closing `]`.
   - Follow the metadata schema defined in the documentation above. 
   - Ensure the `prompt_id` is unique (e.g., `PROMPT-0001`).
4. If you refer to resources in the prompt, add them to a new folder in `resources/{prompt_id}`. 
5. Validate the JSON.
   - Use a JSON validator (e.g., https://jsonlint.com/) to ensure the `prompts.json` file is correctly formatted.
   - Common issues to check for missing commas between objects or unclosed braces or brackets.
6. Open a pull request.
   - The repository maintainer will review your pull request.
   - If approved, your changes will be merged into the main repository.

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
