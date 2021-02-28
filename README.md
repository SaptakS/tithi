# Tithi - A statically generated calendar

![Screenshot of a statically generated calendar](static/screenshot.png)

Tithi creates a calendar with tasks/events/contents based completely on the date frontmatter in a content markdown. It doesn't need any other information. Just create a new content with a particular date and time, and Tithi will create a month view calendar for that particular month.

In case the events range over multiple months, it provides a month selector which allows you to select months ranging from the first month that has an event to the last month that has an event

## Usage

- Install zola using the following guide: https://www.getzola.org/documentation/getting-started/installation/
- Download or clone this repository
- Replace the example markdown files in the `content` folder with appropriate markdown file that you want to show in your calendar. Ensure that the posts that you want to be shown in the calendar has `show_in_calendar = true`
- In `config.toml`, mention the `base_url` where you will host the calendar. This is used to build paths for static assets by zola
- Build the project: `zola build`
- You should now have a `public` folder. You can deploy this folder, wherever you want to host your server.

## Contributing guidelines

### Found a bug? Want a new feature?

If you want to report a bug, or want to suggest a new feature, please go to [issues](https://github.com/SaptakS/tithi/issues/new) and create an issue

### Found something wrong in this README?

Feel free to edit this file, and create a PR

### Want to help improve designs?

Please create a [new issue](https://github.com/SaptakS/tithi/issues/new) with design improvement suggestions

### Want to help fix a bug, or build a feature?

For this, you will need to develop the project locally. Following are the steps for how to do that:

- Install zola using the following guide: https://www.getzola.org/documentation/getting-started/installation/
- Clone this repository: `git clone git@github.com:SaptakS/tithi.git`
- Serve the project locally: `zola serve`
- Visit: `[http://127.0.0.1:1111/](http://127.0.0.1:1111/)`

### Different folders in the project

- **content** - This contains all the markdown files that represent the events/tasks for particular dates. You need to create markdowns with proper dates (YYYY-MM-DD or RFC3339 e.g. 2002-10-02T15:00:00Z). If date is mentioned in YYYY-MM-DD format, the time shown in the event details on clicking is always 12:00 am. The title of the content is shown on the event summary, and rest of the content (along with time) is shown on clicking. Ensure that the posts that you want to be shown in the calendar has `show_in_calendar = true`.

- **sass** - Contains all the SASS stylesheets. The `grids` module contains the monthly calendar grid layout logic.

- **static** - Contains the month switching js file

- **templates** - Contains the HTML template files written using [Tera](https://tera.netlify.app/docs/). All the month and date logics are written using [chrono](https://docs.rs/chrono/0.4.19/chrono/format/strftime/index.html) which is used by Tera for date handling

- **themes** - This is where you would clone the theme you want to use.

## FAQ

### How to use different themes?

- Clone the theme repo in `themes` folder
- Update `config.toml` to use the theme name of your choice
- Update `templates/base.html` to extend the proper base.html
- Update the classes and designs mentioned in `themes/tithi-basic/sass/_calendar.scss` and `themes/tithi-basic/sass/_events.scss` as you seem fit to stylize the calendar and the event components to match your theme. The rest of the styles are anyways applied
- Since the base.html from your theme is extended, the headers, footers and other common components in base.html are automatically applied

### What if I want calendar in different place?

If you don't want the calendar in the index page and want it in some other pages, you can do that too. The entire calendar template is created by a series of macros.

So all you need to do is, whichever html template you want your calendar in
- import the `main` macro: 
```
{%- import "macros/_main.html" as main -%}
```
- get a list of events which have `title`, `date`, `shown_in_calendar` and `content` attributes (mostly using `section.posts` or `posts` depending on the page, but can be different in your case)
- call the macro wherever you want the calendar:
```
{{ main::calendar(events=events) }}
```
