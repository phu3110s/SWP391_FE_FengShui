import React from "react";
import './News.css'
import Header from "../components/header/Header";

function News() {

  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)

  const tabs = $$('.tab-item')
  const panes = $$('.tab-pane')

  tabs.forEach((tab, index) => {
    const pane = panes[index]

    tab.onclick = function () {
      $('.tab-item.active').classList.remove('active')
      $('.tab-pane.active').classList.remove('active')

      this.classList.add('active')
      pane.classList.add('active')
    }
  });

  return (
    <div>
      <Header />
      <div class="tabs">
        <div class="tab-item active">
          News 1
        </div>
        <div class="tab-item">
          News 2
        </div>
        <div class="tab-item">
          News 3
        </div>
        <div class="tab-item">
          News 4
        </div>
        <div class="line"></div>
      </div>

      <div class="tab-content">
        <div class="tab-pane active">
          <h2>News 1</h2>
          <h4>How To Care For Your Koi Fish After Receiving It</h4>
          <p>Use this guide to properly introduce new koi fish into your pond using the proper quarantining, pond care, and water quality control methods for good husbandry in koi care. Based on our Japanese breeders and koi farm, these techniques are what work best when receiving Kodama koi but are also good tips for any koi pond owner adding more koi to their pond.

            Adding new koi to your pond is exciting and fun but should be approached with caution. If you have not added any outside koi in over a year than take extra precautions mentioned in this article on koi care.

            The natural instinct for Nishikigoi is to coexist with others and to bring peace into a home, which is part of their attraction along with their beauty.

            In fact, the peace and enjoyment it brings to many koi and pond owners have grown Nishikigoi appreciation into a global culture.

            Is it Hard to Take Care of Koi Fish?
            No, koi fish care is not hard, but has specific challenges.

            Keeping their water clean, balanced and aerated is the highest priority.

            They can survive through winters and are omnivores with plenty of food options. They are peaceful and hardy creatures. Koi create an intimate ecosystem and are susceptible to the pathogens from outsiders. By taking the time to slowly introduce new koi, you allow them to acclimate to each other and ensure the health of everyone!

            The natural instinct for Nishikigoi is to coexist with others and to bring peace into a home. This, along with their beauty, is a big part of their attraction.

            The peace and enjoyment it brings to koi pond owners has brought Nishikigoi appreciation out of Japan and into global culture. We want you to experience the fun and excitement of growing your koi family, and know a little caution can go a long way, especially if you have not added any outside koi in over a year. Take the extra precautions outlined in this article on koi care and you will have a lifetime of tranquility and joy.
            The Importance of Quarantine for New Koi
            A necessary tool for all koi hobbyists and owners is a separate quarantine tank. It is strongly recommended that every Kodama Koi purchased should be quarantined before adding to your aquarium or pond. Learn more on our other blog post about koi quarantine tank setup & procedures.

            Even with the best care and precautions Nishikigoi carry parasites, bacteria, fungus, and other illnesses. Your koi learn to coexist with local bacteria, but are susceptible to outsiders. Quarantining and introducing local fish and water slowly allows all fish to adapt at a safer pace.

            It’s not just about introducing something unhealthy to your current fish population either. Japanese Koi Fish bought online tend to become extremely stressed and exhausted while in transport from the farm or breeder to the owner. A new fish is even more susceptible to sickness, so the quarantine process gives them time to gets their immunity back up to be a healthy new family addition!
            How Do I Quarantine My Koi Fish (Nishikigoi)?
            It is recommended to keep and treat newly purchased Japanese koi fish in a separate quarantine tank for at least 21 days before introducing them to your pond or aquarium to reduce the risk of disease while giving them time to adjust.

            Basic supplies needed for a quarantine tank:

            The tank (100-300 gallons)
            Net cover for the tank
            Small pump and filter
            Air pump
            Water thermometer
            Test kit for ammonia, nitrate, pH, and salt
            Salt
            Pond or aquarium heater
            Ultimate

            How Do I Quarantine My Koi Fish (Nishikigoi)?
            It is recommended to keep and treat newly purchased Japanese koi fish in a separate quarantine tank for at least 21 days before introducing them to your pond or aquarium to reduce the risk of disease while giving them time to adjust.

            Basic supplies needed for a quarantine tank:

            The tank (100-300 gallons)
            Net cover for the tank
            Small pump and filter
            Air pump
            Water thermometer
            Test kit for ammonia, nitrate, pH, and salt
            Salt
            Pond or aquarium heater
            Ultimate
            Setup Before You Receive Nishikigoi
            1. Prepare the quarantine tank depending on the size of your koi. We recommend 100-300 gallons, blue show tanks are OK too.

            2. Depending on the water of your existing pond, fill the tank with your pond stock (given it’s in good condition), fresh dechlorinated water, or well water.

            3. Ideally, the quarantine tank should have a filtration system as well, but sound aeration from an air pump is acceptable.

            4. Maintain a water temperature of 72° F or above. If working with a smaller tank, 1-2 aquarium heaters will work to achieve that.

            5. Add salt to the tank until it is 0.3% concentration (3 pounds of salt per 100 gallons of water)
            What To Do After You Receive Nishikigoi
            1. Observe for 14-21 Days – Place your Japanese koi fish into the quarantine tank and observe carefully for 14-21 days. Please watch to see if they develop any problems.

            2. Filter or Change Water Every 2-3 Days – If working without a filtration system, partial water changes are needed every 2-3 days of about 25%. Add salt to adjust accordingly.

            3. Feed Easily Digestible Food – Feed your Nishikigoi with digestible koi food every day. We recommend Manda Fu Koi Food.

            4. Check Nitrate and Ammonia Daily – During this initial period, it is EXTRA important to keep your nitrate levels balanced. A new koi, fresh from the stresses of traveling (shipping), is more susceptible to problems.          </p>
        </div>
        <div class="tab-pane">
          <h2>News 2</h2>
          <p>ăng nhăng nhăng nhăng</p>
        </div>
        <div class="tab-pane">
          <h2>News 3</h2>
          <p>nhé nhô</p>
        </div>
        <div class="tab-pane">
          <h2>News 4</h2>
          <p>chin chào</p>
        </div>
      </div>

    </div>
  );
}
export default News;
