import type {iSVG} from '../../types/svg';

export const svgsAI: iSVG[] = [
    {
        title: "Google Bard",
        category: "AI",
        route: "/library/bard.svg",
        url: "https://bard.google.com/"
    },
    {
        title: "OpenAI",
        category: "AI",
        route: {
            light: "/library/openai.svg",
            dark: "/library/openai_dark.svg"
        },
        url: "https://openai.com/"
    },
    {
        title: "HuggingFace",
        category: "AI",
        route: "/library/hf.svg",
        url: "https://huggingface.co/"
    },
    {
        title: "Codium",
        category: "AI",
        route: "/library/codium.svg",
        url: "https://www.codium.ai/"
    },
    {
        title: "Cody",
        category: "AI",
        route: "/library/cody.svg",
        url: "https://about.sourcegraph.com/"
    },
    {
        title: "Sourcegraph",
        category: "AI",
        route: "/library/sourcegraph.svg",
        url: "https://about.sourcegraph.com/"
    },
    {
        title: "Claude AI",
        category: "AI",
        route: "/library/claude-ai.svg",
        url: "https://claude.ai/"
    },
    {
        title: "Perplexity AI",
        category: "AI",
        route: "/library/perplexity.svg",
        url: "https://perplexity.ai/"
    }
];
