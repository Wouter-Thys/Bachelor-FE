<template>
  <!--begin::Dashboard-->
  <div>
    <div v-if="rentTerrains.length" class="row">
      <div class="col-12">
        <div class="d-flex justify-content-center">
          <h1 class="text-primary">Camp visa</h1>
        </div>
      </div>
      <div class="col-12">
        <div class="d-flex justify-content-center">
          <p class="text-primary fs-3">
            A checklist to make sure you don't forget anything important
          </p>
        </div>
      </div>
    </div>
    <div v-if="rentTerrains.length" class="row mt-10 mb-5">
      <div class="d-flex justify-content-center align-items-center">
        <p class="text-primary fs-3 m-0 me-5">Upcomming Camps:</p>
        <select
          v-model="searchCampVisa"
          class="form-select w-50"
          aria-label="Select orderBy"
        >
          <option
            v-for="(item, index) in rentTerrains"
            :key="index"
            :value="item.id"
          >
            From:
            {{ item.startDate.split(' ', 1)[0] }}
            Till:
            {{ item.endDate.split(' ', 1)[0] }}
            Terrain:
            {{ item.terrain.name }}
          </option>
        </select>
      </div>
    </div>
    <div v-if="campVisa.camp_visa" class="card">
      <div class="card-body">
        <h1>General</h1>
        <div class="row mt-8">
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Tents are quite important, make sure you have enough tents to
                sleep and/or cook in or even use as storage in some situations.
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Tents
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.tents"
                class="form-check-input col-6"
                type="checkbox"
                name="tents"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Activities provides a nice feeling and the best thing is if you
                can share it with family members or friends.
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Activities
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.activities"
                name="activities"
                class="form-check-input col-6"
                type="checkbox"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                A camp theme provides a fun, funny connection between the games
                played during camp. All games can be incorporated into the theme
                and what could be more fun than a well-decorated camp
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Theme
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.theme"
                class="form-check-input col-6"
                type="checkbox"
                name="theme"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                A well put together camp booklet will ensure that you always
                know what and when something happens so that the chance of
                miscommunication is quite small
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Camp Booklet
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.camp_booklet"
                class="form-check-input col-6"
                type="checkbox"
                name="camp_booklet"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Of course, make sure that all your equipment is properly checked
                so that you lose less time at camp making it or even getting new
                ones
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Tools
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.tools"
                class="form-check-input col-6"
                type="checkbox"
                name="tools"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
        </div>

        <div class="separator my-10"></div>

        <h1>Communication</h1>
        <div class="row mt-8">
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                In Belgium you need permission from the forester to play in
                forests. only in places that are designated as play forests can
                you play in them without permission.
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Forest Permission
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.forest_permission"
                class="form-check-input col-6"
                type="checkbox"
                name="forest_permission"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Contact the municipality to find out the local regulations. Of
                course also make sure you ask behind the garbage bag arrangement
                because that can be quite different.
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Municipality
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.municipality_contact"
                class="form-check-input col-6"
                type="checkbox"
                name="municipality_contact"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                In Flanders, you are not allowed to make a fire within 25 meters
                of houses and in Wallonia, it can be even stricter, so inquire
                with the correct people so that the making of fire can go
                smoothly without any trouble
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Fire Agency
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.fire_agency_contact"
                class="form-check-input col-6"
                type="checkbox"
                name="fire_agency_contact"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Have an information session for parents so that you can inform
                them about the upcoming camp during this information session it
                is best to go over the medical record of their child with the
                parents, so you're sure that it is complete and not missing
                anything important
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Parents Info Session
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.parents_info_session"
                class="form-check-input col-6"
                type="checkbox"
                name="parents_info_session"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Make sure your leaders are well-informed about how the camp will
                run and so that they know who, to turn to in certain situations
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Leaders Info Session
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.leaders_info_session"
                class="form-check-input col-6"
                type="checkbox"
                name="leaders_info_session"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>

          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                With this extra information session, it is best to inform the
                cooking parents and other people who are going to camp about how
                camp will run and who they should contact in certain situations.
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Extra Info Session
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.extra_info_session"
                class="form-check-input col-6"
                type="checkbox"
                name="extra_info_session"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Make sure your camp is registered online, so you don't really
                get in trouble with your organization BV Scouts or Chiro
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Camp Registration
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.camp_registration"
                class="form-check-input col-6"
                type="checkbox"
                name="camp_registration"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Set the record straight and contact the terrain manager again to
                make sure you won't be surprised when the time comes
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Final Contact Landlord
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.final_contact_landlord"
                class="form-check-input col-6"
                type="checkbox"
                name="final_contact_landlord"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
        </div>
        <div class="separator my-10"></div>

        <h1>Insurances</h1>
        <div class="row mt-8">
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Fire insurance is quite important so that everything is somewhat
                insured for storm, water and fire damage
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Fire Insurance
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.fire_insurance"
                class="form-check-input col-6"
                type="checkbox"
                name="fire_insurance"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                The transport insurance ensures that both your Leaders and the
                transporter do not have to worry about high costs in the event
                of damage.
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Transport Insurance
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.transport_insurance"
                class="form-check-input col-6"
                type="checkbox"
                name="transport_insurance"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Insurance against physical accidents and civil liability for
                everyone who is at camp
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Persons Insurance
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.persons_insurance"
                class="form-check-input col-6"
                type="checkbox"
                name="persons_insurance"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Insurance especially for your carriers so that they are insured
                during the pick-up and delivery of various things
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Cars Insurance
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.cars_insurance"
                class="form-check-input col-6"
                type="checkbox"
                name="cars_insurance"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                This insurance is not really necessary but check it anyways when
                it comes to cars
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Theft Insurance
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.theft_insurance"
                class="form-check-input col-6"
                type="checkbox"
                name="theft_insurance"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Insurance that helps you in the event of damage to a 3rd party
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Social Assistance Insurance
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.social_assistance_insurance"
                class="form-check-input col-6"
                type="checkbox"
                name="social_assistance_insurance"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                Choose equipment insurance to insure tents, group or personal
                equipment (bicycle, mobile phone, laptop, radio...).
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Group Equipment Insurance
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.group_equipment_insurance"
                class="form-check-input col-6"
                type="checkbox"
                name="group_equipment_insurance"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
          <div class="col-6 my-4">
            <div class="row">
              <span class="fs-6 col-10 my-4">
                This is for undocumented children if they dont have a SIS card.
                You can just get it at the OCMW
              </span>
              <label
                class="d-flex align-items-center fs-5 fw-bold mx-2 col-6"
                for="ESSinks"
              >
                Medical Assistance Certificate
              </label>
              <input
                id="ESShowers"
                v-model="campVisa.camp_visa.medical_assistance_certificate"
                class="form-check-input col-6"
                type="checkbox"
                name="medical_assistance_certificate"
                :false-value="0"
                :true-value="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="border border-dashed border-gray-500 border-2 rounded py-9"
    >
      <div class="row">
        <div class="d-flex justify-content-center">
          <h1 class="text-primary">Camp visa</h1>
        </div>
        <div class="d-flex justify-content-center">
          <span class="fs-4 text-primary">No Upcomming Camps</span>
        </div>
      </div>
      <div class="row pt-5">
        <div class="d-flex justify-content-center">
          <router-link to="/dashboard" class="cbtn-dark">Dashboard</router-link>
        </div>
      </div>
    </div>
  </div>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { setCurrentPageTitle } from '@/core/helpers/breadcrumb';
import useCampVisa from '@/core/composables/campvisa';

export default defineComponent({
  name: 'MainDashboard',
  components: {},
  setup() {
    const { rentTerrains, campVisa, getApprovedTerrains, getCampVisa } =
      useCampVisa();
    const searchCampVisa = ref();

    watch(searchCampVisa, async (newValue) => {
      await getCampVisa(newValue);
    });
    watch(campVisa, async (newValue) => {
      //console.log(newValue);
    });
    onMounted(async () => {
      setCurrentPageTitle('');
      await getApprovedTerrains();
      if (rentTerrains.value.length) {
        await getCampVisa(rentTerrains.value[0].id);
        searchCampVisa.value = rentTerrains.value[0].id;
      }
    });

    return { rentTerrains, campVisa, searchCampVisa };
  },
});
</script>
