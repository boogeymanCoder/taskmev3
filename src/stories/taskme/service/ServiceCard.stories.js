import React from "react";
import OfferCardView from "/src/components/offer/OfferCard";
import { default as ServiceCardComponent } from "/src/components/service/ServiceCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const sb = {
  title: "Service/Service Card",
  component: ServiceCardComponent,
  argTypes: {
    onEdit: { action: "onEdit" },
    onDelete: { action: "onDelete" },
    onOffer: { action: "onOffer" },
  },
};
export default sb;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ServiceCardComponent {...args} />;

export const NotOwned = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NotOwned.args = {
  avatar:
    "https://images.unsplash.com/photo-1608415389300-d15691405dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  owner: "Percy Jackson",
  lastUpdated: "2 days ago",
  title: "Photo Editing",
  details:
    "I have 5 years of experience in photo editing utilizing wide arsenal of photo editing software.",
  tags: ["photoEditing", "PhotoShop"],
  currency: "PHP",
  price: 67.32,
  isOwned: false,
};

export const Owned = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Owned.args = {
  avatar:
    "https://images.unsplash.com/photo-1608415389300-d15691405dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  owner: "Percy Jackson",
  lastUpdated: "2 days ago",
  title: "Photo Editing",
  details:
    "I have 5 years of experience in photo editing utilizing wide arsenal of photo editing software.",
  tags: ["photoEditing", "PhotoShop"],
  currency: "PHP",
  price: 67.32,
  isOwned: true,
};

export const WithOffers = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithOffers.args = {
  avatar:
    "https://images.unsplash.com/photo-1608415389300-d15691405dc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  owner: "Percy Jackson",
  lastUpdated: "2 days ago",
  title: "Photo Editing",
  details:
    "I have 5 years of experience in photo editing utilizing wide arsenal of photo editing software.",
  tags: ["photoEditing", "PhotoShop"],
  currency: "PHP",
  price: 67.32,
  isOwned: true,
  offers: [
    <OfferCardView
      key="1"
      avatar="https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80"
      details="I am currently looking for a photo editor for my sisters birthday, if you are interested."
      lastUpdate="2 minutes ago"
      name="Anabeth Chase"
      taskLink="#"
      taskTitle="Photo Editing"
      style={{ border: "none", boxShadow: "none" }}
    />,
    <OfferCardView
      key="2"
      avatar="https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80"
      details="I am currently looking for a photo editor for my sisters birthday, if you are interested."
      lastUpdate="2 minutes ago"
      name="Anabeth Chase"
      taskLink="#"
      taskTitle="Photo Editing"
      style={{ border: "none", boxShadow: "none" }}
    />,
  ],
};
