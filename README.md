<div align="center">
  <h1 align="center">1 Line Layouts - Study Case</h1>
  <p align="center">
    1-Line Layouts study case implementation based on <a href="https://1linelayouts.glitch.me/">1-Line Layouts</a>
    <br />
    <a href="https://1linelayouts-studycase.netlify.app/">View Demo</a>
  </p>
</div>


## About The Project
This project is a simple implementation of modern css hacks based on [1linelayouts.glitch.me](https://1linelayouts.glitch.me/) with various design and visual in order to give a better understanding (hopefully) of the modern css techniques using design reference by [uidesigndaily.com/](https://www.uidesigndaily.com/)

### Built With
> This project use **NO** css framework/libraries at all! :open_mouth:

Yup. one of the challenge of this project is not to use any CSS libraries or framework. This project is also comes with my very own **Builder Tools** using  [Gulp](https://gulpjs.com/). So before we talk about the 1-Line Layouts implementation, let's get started with the builder tools itself :wink:


## Getting Started

### UiKit a.k.a Builder Tools
As mention above, This UiKit use no css libraries at all, so instead of using libraries, the CSS will use a mixed up CSS methodology approach, consisting [**BEM**](http://getbem.com/naming/)-[IT](https://gist.github.com/stephenway/a6145d9b4430e8c55a77) and *semi* **Atomic** CSS methodology. let's take a look with SCSS structure first:

```
app
└── assets
	├── ...
	└── scss
		├── abstracts		# variable, mixins
		├── base		# reset, typography
		├── components		# sections
		├── layout		# header, container, footer
		├── objects		# button, heading, description 
		├── themes		# design themes
		├── utilities		# display, size, text
		├── critical.scss	# consist all except components
		└── styles.scss		# consist components only
```

SCSS folder architecture is using adaptation and modification of **7-1 Pattern**, classes on each style basically using BEM-IT notation, but for some reason **objects** and **utilities** use the Atomic approach *just imagine a less utilities in Tailwind CSS:satisfied:

### 1-Line Layouts Case
>Well, without further due let's get into the study case!

As the title "Study Case" in this project,  here's some of the 1-Line Layouts *hacks* i have implemented:

1.  **Super Centered** - [View](https://1linelayouts-studycase.netlify.app/super-centered.html)

	Ever get confused how to make an element horizontal and vertically center?
	No more hassle, use `place-items: center` !

	Here's the basic css you need:
	```css
	.super-centered {
		display: grid;
		place-items: center /* this is the magic mantra */
	}
	```
	> CSS classes will be different in the demo!
2.  **The Deconstructed Pancake** - [View](https://1linelayouts-studycase.netlify.app/deconstructed-pancake.html)

	Flex and responsive. You want a responsive stack of items? use `flex: 0 1 <baseWidth>`
	
	Here's the basic CSS example:
	```css
	.deconstructed-pancake__parent {
		display: flex;
		flex-wrap: wrap;
	}
	
	.deconstructed-pancake__item {
		flex: 0  1  200px;
		aspect-ratio: 1/1;	/* you may use aspect ratio as well */
	}
	```
	> CSS classes will be different in the demo!

3.  **Sidebar Says** - [View](https://1linelayouts-studycase.netlify.app/sidebar-says.html)

	No need to hassle about filling up the rest space of the block/element again. use `grid-template-columns: minmax(<min>, <max>) ...`
	
	Here's the basic CSS example:
	```css
	.sidebar-says {
		display: grid;
		grid-template-columns: minmax(150px, 25%) 1fr;
	}
	```
	> CSS classes will be different in the demo!
	
4.  **RAM (Repeat, Auto, Minmax)** - [View](https://1linelayouts-studycase.netlify.app/ram.html)

	Ever get tired removing the first and the last margin of items in a row? Wanna try the alternative of flex and flex-wrap ? use `grid-template-columns: repeat(auto-fit, minmax(<base>, 1fr))` !

	Here's the basic CSS example:
	```css
	.ram {
		display: grid;
		gap: 32px;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
	```
	> CSS classes will be different in the demo!
	
5.  **Clamping My Style** - [View](https://1linelayouts-studycase.netlify.app/clamping-my-style.html)

	Need more control between various values due to the responsiveness? try `clamp(<min>, <actual>, <max>)`
	
		Here's the basic CSS example:
	```css
		.clamping-my-style {
			width: clamp(200px, 28%, 33.33%);
			aspect-ratio: 1/1;	/* you may use aspect ratio as well */
		}
	```
	> CSS classes will be different in the demo!
	
**Fun Fact**: There will be `this-is__case` (ex: `this-is__super-centered`) class if you try to inspect on each page cases to help you know the block/element that using the *hacks*

## Installation

1. Clone this repository
	```sh
	git clone <repository_url>	
	```
2. Get into cloned folder
	```sh
	cd 1linelayouts-studycase
	```
3. Install NPM packages
	```sh
	npm install
	```
4. Run the project
	```sh
	yarn serve
	```
	or
	```sh
	npm run serve
	```
