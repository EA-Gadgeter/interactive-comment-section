# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Links](#links)
- [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.

### Links

- Solution URL: [https://github.com/EA-Gadgeter/interactive-comment-section](https://github.com/EA-Gadgeter/interactive-comment-section)
- Live Site URL: [https://ea-gadgeter.github.io/interactive-comment-section/](https://ea-gadgeter.github.io/interactive-comment-section/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow
- AI (Github Copilot Student Plan, using Agent and Plan mode)
- [Angular with signals](https://angular.dev/) - JavaScript Framework

### What I learned

To be honest, I was surprised when the AI decided to make the edit text area close 
using the ESC key; it was something I hadn’t known how to do in Angular until 
now, and actually, it’s not that complicated.

```typescript
@Component({
  selector: 'app-comment-card',
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The important is this
  host: {
    '(document:keydown.escape)': 'cancelEditing()'
  }
})
```

### Continued development

I feel that there were some implementations where the AI had over-engineered 
things; I pointed this out to it and he toned it down a bit, but I suppose 
I could have had a bit of a dig through the code to simplify a few things. 
That said, I think the current result is more than acceptable.

### AI Collaboration

Much like my last challenge, I want to keep experimenting and speeding up my development process using AI, so I let it take full control, whilst I stepped in on occasion to make a few tweaks or corrections.

The last time I used WebStorm with AI, to be honest, the experience left quite a lot to be desired, but that was a few years ago, so I decided to give it another go, and honestly, it has improved a lot compared to VSCode (using Gemini 3.1 Pro Preview); it has almost all the features.

I still prefer VSCode; I’m not sure if it was the model that I used this time (GPT 5.3 Codex for everything), the fact that I was using Angular, or VSCode itself, but I felt VSCode not only gave me better answers; but also understood the AGENTS.md file provided by the folks at Frontend Mentor better, as it asked me far more questions and did less over-engineering of the code.

## Author

- Website - [Emiliano Acevedo](https://ea-gadgeter.github.io/Web-Portafolio/) **VERY outdated, have learned a lot more since I made this portfolio**
- Frontend Mentor - [@EA-Gadgeter](https://www.frontendmentor.io/profile/EA-Gadgeter)
- LinkedIn - [Emiliano Acevedo](https://www.linkedin.com/in/ariel-emiliano-acevedo-posos-72044a247/?locale=en_US)

