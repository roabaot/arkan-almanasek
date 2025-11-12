export interface PricingPlan {
    id: number;
    price: number;
    title: string;
    features: string[];
  }
  
  export const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      price: 19,
      title: "Hard",
      features: [
        "Mistakes To Avoid",
        "Winning for Your Startup",
        "Mistakes To Avoid",
        "Your Event, Your Memories",
      ],
    },
    {
      id: 2,
      price: 9,
      title: "Easy",
      features: [
        "Mistakes To Avoid",
        "Winning for Your Startup",
        "Mistakes To Avoid",
        "Your Event, Your Memories",
      ],
    },
    {
      id: 3,
      price: 29,
      title: "Normal",
      features: [
        "Mistakes To Avoid",
        "Winning for Your Startup",
        "Mistakes To Avoid",
        "Your Event, Your Memories",
      ],
    },
  ];
  