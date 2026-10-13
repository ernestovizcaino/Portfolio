# 1. I Shipped Kashi. Getting People to Use It Was Harder.

I spent months building Kashi, a point-of-sale and business management platform for small businesses. It had sales, inventory, customer records, quotes, credit tracking, reports, online catalogs, and WhatsApp ordering. It ran on web and mobile.

It worked. That was the part I knew how to do.

Getting a business to use it was a different problem.

## The launch

I had treated shipping as the finish line. Once Kashi was online, I expected people to recognize how much work it could save them.

I ran Meta ads for about a week at roughly MXN 200 a day. The campaign brought around 100 visits per day, about 20 registrations, and five trial users.

All five canceled.

The numbers were small, but they were enough to challenge my assumptions. People were willing to click and some were willing to sign up. That wasn't the same as being willing to change how they ran their business.

At first I wondered whether price was the problem. I added a free plan. Usage was still limited to one or two active users.

Removing the price had made Kashi easier to try, not necessarily more useful to adopt.

## I had built too much before learning enough

Kashi covered several jobs that a small business might need to do. But each new feature also meant more decisions for someone opening the app for the first time.

I spoke with or observed businesses such as flower shops, hardware stores, cafés, pet groomers, and grocery stores. They didn't have the same workflows. Some used notebooks, spreadsheets, WhatsApp, or older software. Those tools had limitations, but everyone already understood them.

A new product had to be more useful than their existing process *after accounting for the effort required to switch*.

I could demonstrate an inventory dashboard. The owner still had to enter their inventory. I could demonstrate customer management. They still had to change a habit. My feature list described what Kashi could do; it didn't prove why a specific business needed it this week.

## What I'd do differently

I'd choose one type of business first. I'd watch owners do the work and find one repeated, costly problem. Then I'd build the smallest workflow that solves it.

I'd also decide what counts as activation before launch. For a point-of-sale tool, recording the first real sale might matter more than registering an account. For quoting, it might be sending a quote to a customer.

Then I'd measure how many people reach that point, talk to the ones who don't, and change the product accordingly.

Kashi taught me to build software. Launching it taught me that the real test starts when someone has the option not to use it.

---

# 2. I Kept Adding Features. Users Still Didn't Stay.

When Kashi wasn't growing, adding features felt like progress.

I could spend a day improving inventory, shipping a report, or making the mobile app easier to use. There was always something concrete to finish. Talking to users and narrowing the product was harder because the answers might mean that much of what I'd built wasn't necessary.

So I kept building.

## A complete product isn't a focused product

Kashi expanded from point of sale into inventory, customer records, quotes, credit tracking, reports, online catalogs, WhatsApp orders, and a web app.

Each feature made sense on its own. Together, they gave new users more choices before they had completed a single useful task.

A florist looking for help with custom orders didn't need the same first screen as a hardware store trying to track thousands of products. Supporting both meant building a broad platform before proving that either group had a strong reason to return.

That was a positioning problem and an engineering problem. Every feature needed onboarding, permissions, testing, support, and maintenance. The roadmap grew without answering the most important question: what should a new user accomplish first?

## The question I ask now

I used to ask, "What else should the product do?"

Now I try to ask, "What is stopping someone from getting the result they came for?"

Sometimes the answer is another feature. It might also be a shorter setup flow, useful default data, a clearer empty state, or simply removing three options from a screen.

I think about a feature in terms of what someone will do differently after it's built. Will they complete their first sale faster? Will they return next week? Will they be able to finish a task they couldn't finish before?

I didn't learn this from a successful feature launch. I learned it by shipping a lot of features that didn't produce the adoption I expected.

Being able to build more isn't the same as knowing what to build next.

---

# 3. A Week of Meta Ads, Five Trials, and No Retained Customers

When I wanted to get Kashi in front of more businesses, I tried paid acquisition.

For about a week I spent roughly MXN 200 a day on Meta ads. They brought around 100 visits per day, about 20 registrations, and five trial users.

Every trial user canceled.

It's a small experiment, not a universal benchmark. But it was useful because it showed me where my thinking was wrong.

## The clicks weren't the main problem

I initially wanted more traffic. The ads gave me some. People clicked, and some registered. But they weren't staying.

I could have spent more to get more visitors. Instead I needed to understand what happened between registration and the first useful result.

A small-business owner opening Kashi might need to add products, configure inventory, understand the interface, and change how their staff work. From my side, that was onboarding. From their side, it was unpaid work before they received any value.

The ad promised a simpler way to run a business. The product still asked users to do a lot before they could see that simplicity.

## Free didn't solve it either

After the trials canceled, I added a free plan to test whether pricing was the obstacle. Adoption remained low: one or two active users.

That didn't prove pricing never matters. It suggested that price wasn't the only barrier for these users. Switching costs, setup, and an unclear first outcome still existed.

## What I would measure first

Before running another campaign, I'd choose a meaningful activation event and instrument the funnel around it.

For a POS product, that could be a first completed sale. For a quoting workflow, a first quote actually sent. I would track how many new users reach that point and speak directly with people who stop short.

I'd ask what they were trying to do, what they expected, where they got stuck, and what they currently use instead. Those answers would be more useful than another dashboard showing cheaper clicks.

I wouldn't call the ads a success. They didn't generate retained customers. But they helped me see that getting someone to visit a product and giving them a reason to use it again are different jobs.

---

# 4. I Tried to Build for Every Small Business

My first description of Kashi's customer was "small businesses."

That seemed specific enough. Shops needed to track sales, inventory, customers, and money. I thought one flexible platform could serve most of them.

Then I spent time with businesses that were all "small" and had almost nothing else in common.

A flower shop handled custom orders and delivery dates. A hardware store dealt with large inventories and supplier pricing. A café needed quick service. A pet grooming business relied on appointments and repeat visits. A grocery store cared about fast checkout.

Their needs overlapped on a feature list. Their days did not.

## The broad audience showed up in the product

I tried to give everyone something useful. That produced more screens, more configuration, and a homepage that had to promise everything at once.

"Manage your business in one place" was true enough to describe Kashi. It didn't tell a florist why they should stop using their existing process today.

The same problem affected distribution. Where do small-business owners spend time online? There isn't one answer. A florist may follow event-planning communities. A hardware store owner may know suppliers and trade groups. The channels, language, and buying triggers change by business.

I'd made the addressable audience large on paper and difficult to reach in practice.

## What I'd do differently

I'd start with one business category and one painful workflow.

I would visit owners, watch how they do the task today, and ask about actual failures: a missed order, an inventory mistake, a late quote, or a customer they failed to follow up with.

I'd look for problems that recur, cost money or time, and are already being solved awkwardly. I'd build a narrow tool around one of those problems and see whether people come back.

I'd still want the option to expand. But I'd rather earn it by solving one job well than start with a platform broad enough to fit everyone and specific enough for nobody.

---

# 5. Shipping Software Is Different When Someone Depends on It

A demo usually follows the path its developer prepared. A customer doesn't.

They enter unexpected data, lose their connection, misunderstand a label, abandon a setup halfway through, and return days later expecting everything to be exactly where they left it.

Building and operating products changed what I pay attention to as an engineer.

## The parts a demo doesn't show

Authentication and permissions. Database migrations. Failed payments. Backups. Monitoring. Support. Onboarding. What happens when an external service is unavailable.

These aren't exciting features, but they become important once another person relies on the product.

I started caring more about failure states and maintainability, not just whether a feature worked on my machine. A simple architecture I can debug under pressure is often better than an elaborate one I can't operate confidently.

## Users are part of the engineering process

When multiple people misunderstand a screen, that's feedback about the screen. When they create accounts but don't finish setup, that's not necessarily an acquisition problem. When they cancel a trial, the next question isn't what feature to add; it's what they expected and what stopped them.

Kashi made this painfully clear. I shipped a working web and mobile product, ran ads, saw registrations and trials, and still struggled to retain users.

It was possible to be proud of the engineering and dissatisfied with the outcome at the same time.

## The work doesn't end at launch

A personal project can demonstrate that I know how to build something. A product forces me to answer harder questions: Who needs it? How will they find it? Can they get value quickly? Will they trust it enough to return?

That's the work I enjoy now: building the software, putting it into the world, and letting actual usage change what I build next.
