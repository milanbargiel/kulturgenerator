<template>
  <div class="sa-container">
    <div class="sa-container__heading title">
      was möchten sie<br />einreichen?
    </div>
    <div class="sa-container__explain">
      Materielle künstlerische Objekte, z.B. Gemälde, Fotografien, Plakate,
      Zeichnungen, Skulpturen, Skizzen, Plakate und Druckmedien in kleineren
      handsignierten Auflagen, Plastiken, Installationen.
    </div>
    <form ref="form" class="sa-form" @submit="submit">
      <input type="hidden" name="type" value="Objekt" />
      <!-- ARTWORK -->
      <div class="form-group form-group--wide">
        <!-- title -->
        <div class="form-group">
          <label class="form-group__label" for="title-input"
            >Titel <span class="form-field-required">*</span></label
          >
          <input
            class="form-group__input"
            type="text"
            name="title"
            id="title-input"
            maxlength="60"
            required
          />
        </div>

        <!-- description -->
        <div class="form-group">
          <label class="form-group__label" for="description-input"
            >Kurzbeschreibung <span class="form-field-required">*</span></label
          >
          <textarea
            class="form-group__input"
            name="description"
            rows="6"
            id="description-input"
            maxlength="2000"
            required
          ></textarea>
          <div class="form-help">
            Dieser Text beschreibt Ihr Angebot und erscheint auf der Homepage.
            Bei Objekten fügen Sie bitte Angaben zu Material, Entstehungsjahr,
            Größe und Genre/Stil hinzu, sowie bei einer Auflage die Stückzahl.
            <div class="form-help__question-mark title title--grid">
              &nbsp;?
            </div>
          </div>
        </div>

        <!-- image -->
        <div class="form-group--small">
          <label class="form-group__label" for="image-input">
            Bilder hochladen
            <span class="form-field-required">*</span>
          </label>

          <div class="iu-container">
            <!-- upload button -->
            <label for="image-input" class="button"
              >Wählen Sie eine Datei aus</label
            >

            <!-- hidden image input -->
            <input
              @change="fileChange"
              ref="fileInput"
              class="hidden-input js-file-input"
              type="file"
              id="image-input"
              accept="image/*"
              required
            />

            <div ref="imageDataContainer">
              <!-- <div class="iu-image">
              <span class="file-name">xy.jpg</span><span class="remove-button js-remove-image">x</span>
            </div> -->
            </div>
          </div>

          <!-- error when image is to big -->
          <div v-if="imageSizeError" class="error">
            Das Bild, das sie ausgewählt haben, ist größer als die maximal
            erlaubte Dateigröße von 5 MB. Bitte wählen Sie ein anderes aus.
          </div>

          <!-- error when more than 3 images are selected -->
          <div v-if="tooManyImagesError" class="error">
            Sie können maximal drei Bilder auswählen.
          </div>

          <!-- help texts -->
          <div class="form-help">
            Hier können Sie Bilder Ihres Angebotes (max. 5 MB pro Datei) zur
            Darstellung im Kulturgenerator hochladen.
            <div class="form-help__question-mark title title--grid">
              &nbsp;?
            </div>
          </div>
        </div>

        <!-- imgLicense -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="checkbox"
            name="imgLicense"
            value="true"
            id="imagelicense-input"
          />
          <label for="imagelicense-input"
            >Ich erlaube hiermit die Weiternutzung des Bildes/der Bilder für die
            Verwendung im Projekt und versichere, dass ich Urheber*in bzw.
            Inhaber*in des vollumfänglichen Nutzungsrechts bin.
            <span class="form-field-required">*</span></label
          >
        </div>
      </div>

      <!-- MONEY -->
      <div class="form-group form-group--wide">
        <!-- price -->
        <div class="form-group--small">
          <label class="form-group__label" for="price-input"
            >Preis in € <span class="form-field-required">*</span></label
          >
          <input
            class="form-group__input"
            type="number"
            step="any"
            name="price"
            id="price-input"
            required
          />
        </div>

        <!-- checkboxes -->
        <!-- generatorShare 100% -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="radio"
            name="generatorShare"
            value="_100"
            id="donation-input-100"
            required
          />
          <label for="donation-input-100"
            >Ich möchte 100% meiner Einnahmen durch Verkauf solidarisch
            verteilen.</label
          >
        </div>

        <!-- generatorShare 50% -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="radio"
            name="generatorShare"
            value="_50"
            id="donation-input-50"
            required
          />
          <label for="donation-input-50"
            >Ich möchte 50% meiner Einnahmen durch Verkauf solidarisch
            verteilen.</label
          >
        </div>

        <!-- payout -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="checkbox"
            name="payout"
            value="Nein"
            id="payout-input"
          />
          <label for="payout-input"
            >Ich möchte nicht an der Ausschüttung des Generators beteiligt
            werden.</label
          >
        </div>
        <div class="form-help form-help--checkbox">
          Die Ausschüttung ist die Verteilung des gesammelten Geldes unter allen
          Beteiligten, unabhängig davon, ob Ihr Angebot verkauft wurde oder
          nicht.
          <div class="form-help__question-mark title title--grid">&nbsp;?</div>
        </div>
      </div>

      <!-- TAX -->
      <div class="form-group form-group--wide">
        <label class="form-group__label"
          >Umsatzsteuer <span class="form-field-required">*</span></label
        >

        <!-- tax 16 -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="radio"
            name="tax"
            value="_16"
            id="tax-input-16"
            required
          />
          <label for="tax-input-16">16 Prozent</label>
        </div>

        <!-- tax 5 -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="radio"
            name="tax"
            value="_5"
            id="tax-input-5"
            required
          />
          <label for="tax-input-5">5 Prozent</label>
        </div>

        <!-- tax 0 -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="radio"
            name="tax"
            value="_0"
            id="tax-input-0"
            required
          />
          <label for="tax-input-0"
            >Ich bin Kleinunternehmer und muss keine Umsatzsteuer
            abführen.</label
          >
        </div>
        <div class="form-help form-help--checkbox">
          Die Umsatzsteuer wird auf den von Ihnen definierten Nettopreis
          aufgerechnet.
          <div class="form-help__question-mark title title--grid">&nbsp;?</div>
        </div>
      </div>

      <!-- shippingCosts -->
      <div class="form-group form-group--wide">
        <div class="form-group--small">
          <label class="form-group__label" for="shipping-costs-input"
            >Versandkosten in €
            <span class="form-field-required">*</span></label
          >
          <input
            class="form-group__input"
            type="number"
            step="any"
            name="shippingCosts"
            id="shipping-costs-input"
            required
          />
        </div>
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="checkbox"
            value="true"
            id="shipping-input-objekt"
            required
          />
          <label for="shipping-input-objekt"
            >Hiermit versichere ich, dass ich das Kunstwerk nach Verkauf
            schnellstmöglich an die Käufer*in versende oder anderweitig
            liefere.</label
          >
        </div>
      </div>

      <!-- paypal -->
      <div class="form-group">
        <label class="form-group__label" for="paypal-input"
          >PayPal Konto <span class="form-field-required">*</span></label
        >
        <input
          class="form-group__input"
          type="email"
          name="paypal"
          id="paypal-input"
          required
        />
        <div class="form-help">
          Um sich am Generator zu beteiligen, müssen Sie ein PayPal-Konto haben.
          Tragen Sie hier bitte die dazugehörige E-Mail-Adresse ein. Diese
          E-Mail-Adresse wird bei Transaktion der Käuferin oder dem Käufer
          angezeigt. Falls sie kein PayPal Konto haben, können Sie
          <a
            href="https://www.paypal.com/welcome/signup/#/email_password"
            target="_blank"
            class="underlined-link underlined-link--grey"
            >hier</a
          >
          eins erstellen.
          <div class="form-help__question-mark title title--grid">&nbsp;?</div>
        </div>
      </div>

      <!-- email -->
      <div class="form-group">
        <label class="form-group__label" for="email-input"
          >E-Mail-Adresse <span class="form-field-required">*</span></label
        >
        <input
          class="form-group__input"
          type="email"
          name="email"
          id="email-input"
          required
        />
      </div>

      <!-- author -->
      <div class="form-group">
        <label class="form-group__label" for="fullname-input"
          >Name, Vorname <span class="form-field-required">*</span></label
        >
        <input
          class="form-group__input"
          type="text"
          name="author"
          id="fullname-input"
          maxlength="60"
          required
        />
      </div>

      <!-- street -->
      <div class="form-group">
        <label class="form-group__label" for="street-input"
          >Straße und Hausnummer
          <span class="form-field-required">*</span></label
        >
        <input
          class="form-group__input"
          type="text"
          name="street"
          id="street-input"
          maxlength="60"
          required
        />
      </div>

      <div class="form-group form-group--adress">
        <div class="form-group__postal">
          <!-- postalCode -->
          <label class="form-group__label" for="postalcode-input"
            >PLZ <span class="form-field-required">*</span></label
          >
          <input
            class="form-group__input"
            type="number"
            name="postalCode"
            id="postalcode-input"
            required
          />
        </div>
        <div class="form-group__place">
          <!-- place -->
          <label class="form-group__label" for="place-input"
            >Ort <span class="form-field-required">*</span></label
          >
          <input
            class="form-group__input"
            type="text"
            name="place"
            id="place-input"
            maxlength="60"
            required
          />
        </div>
      </div>
      <!-- artisticwork -->
      <div class="form-group">
        <label class="form-group__label" for="artisticwork-input"
          >Kulturschaffende Tätigkeit
          <span class="form-field-required">*</span></label
        >
        <textarea
          class="form-group__input"
          name="artisticWork"
          id="artisticwork-input"
          maxlength="2000"
          rows="6"
          required
        ></textarea>
        <div class="form-help invisible visible-erlebnis visible-objekt">
          Bitte haben Sie Verständnis, dass nicht alle Einreichungen
          berücksichtigt werden können. Es sollen nur diejenigen vom Generator
          profitieren, die professionell als Kunst- und Kulturschaffende tätig
          sind. Bitte beschreiben Sie kurz Ihre Arbeit. Ggf. können Sie Links zu
          Webseiten, eine kurze Aufzählung Ihrer letzten Projekte und/oder
          Ausstellungen, als auch ein abgeschlossenes oder laufendes Studium in
          dem Bereich aufführen.
          <div class="form-help__question-mark title title--grid">&nbsp;?</div>
        </div>
      </div>

      <!-- website -->
      <div class="form-group">
        <label class="form-group__label" for="website-input"
          >Webseite (wenn vorhanden)</label
        >
        <input
          class="form-group__input"
          type="text"
          name="website"
          id="website-input"
          maxlength="60"
        />
      </div>

      <!-- institution -->
      <div class="form-group">
        <label class="form-group__label" for="institution-input"
          >Institution (wenn vorhanden)</label
        >
        <input
          class="form-group__input"
          type="text"
          name="institution"
          id="institution-input"
          maxlength="60"
        />
      </div>

      <div class="form-group form-group--wide">
        <!-- shipping (not stored in db) -->
        <div class="form-check invisible visible-erlebnis">
          <input
            class="form-check__checkbox"
            type="checkbox"
            value="true"
            id="shipping-input"
            required
          />
          <label for="shipping-input"
            >Hiermit versichere ich, dass ich das Erlebnis nach Verkauf
            schnellstmöglich an die Käufer*in verschicke oder anderweitig
            übergebe.</label
          >
          <span class="form-field-required">*</span>
        </div>

        <!-- gdpr -->
        <div class="form-check">
          <input
            class="form-check__checkbox"
            type="checkbox"
            name="gdpr"
            value="true"
            id="gdpr-input"
            required
          />
          <label for="gdpr-input"
            >Ich bin damit einverstanden, dass meine Angaben im Rahmen der
            Abwicklung verwendet und verwahrt werden.</label
          >
          <span class="form-field-required">*</span>
        </div>
        <div>
          Die mit <span class="form-field-required">*</span> gekennzeichneten
          Felder bitte unbedingt ausfüllen.
        </div>

        <!-- Submit Button -->
        <button type="submit" class="form-group__submit button button--primary">
          einreichen &#x23ce;
        </button>

        <!-- Saving Animation -->
        <span v-if="saving" class="saving"
          ><span>.</span><span>.</span><span>.</span></span
        >

        <div class="form-responses">
          <div v-if="submissionSucess" class="sucess">
            Vielen Dank für die Einreichung! Wir melden uns bei Ihnen, wenn wir
            das Angebot gesichtet haben.
          </div>
          <div v-if="submissionError" class="error">
            Ein Fehler ist aufgetreten. Versuchen Sie es später erneut oder
            wenden Sie sich an
            <a
              href="mailto:info@kulturgenerator.org"
              class="underlined-link underlined-link--red"
              >info@kulturgenerator.org</a
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SubmitArtForm',
  data() {
    return {
      imageSizeError: false,
      tooManyImagesError: false,
      submissionError: false,
      submissionSucess: false,
      saving: false,
      files: {},
    }
  },
  methods: {
    clearForm() {
      this.$refs.form.reset()
      this.$refs.imageDataContainer.innerHTML = ''
      // manually dispatch change event to fileInput Listener
      // to reset file input
      const event = document.createEvent('HTMLEvents')
      event.initEvent('change', false, true)
      this.$refs.fileInput.dispatchEvent(event)
      this.files = {}
    },
    removeImageOnClick(fileName, node) {
      node.addEventListener('click', () => {
        delete this.files[fileName] // remove file from global files object
        const imageDiv = node.parentNode
        imageDiv.parentNode.removeChild(imageDiv)
      })
    },
    fileChange(inputEvent) {
      const file = inputEvent.target.files[0]
      const reader = new FileReader()

      // remove error messages
      this.imageSizeError = false
      this.tooManyImagesError = false

      // create hidden text image data to upload via form
      reader.addEventListener('load', () => {
        this.files[file.name] = file // push file to global files object
        const newImage = document.createElement('div')
        newImage.setAttribute('class', 'iu-image')
        const html = `<span class="file-name">${file.name}</span><span class="remove-button">x</span>`
        newImage.innerHTML = html
        this.removeImageOnClick(file.name, newImage.lastChild) // bind event listener to remove element
        this.$refs.imageDataContainer.appendChild(newImage)
      })
      if (file) {
        // file selected
        if (Object.keys(this.files).length < 3) {
          // max 3 files
          const fileSize = (file.size / 1024 / 1024).toFixed(4)

          if (fileSize < 5) {
            // max 5MB
            reader.readAsDataURL(file)
          } else {
            this.imageSizeError = true
          }
        } else {
          // more that 3 images are selected
          this.tooManyImagesError = true
        }
      }
    },
    submit(event) {
      event.preventDefault()

      // clear any response texts if existent
      this.submissionError = false
      this.submissionSucess = false

      // setup some local variables
      const inputs = this.$refs.form.querySelectorAll('input, textarea')

      // Serialize the data in the form
      const formData = new FormData()
      const data = {}

      inputs.forEach(input => {
        if (
          !['submit', 'file'].includes(input.type) &&
          input.value &&
          input.name
        ) {
          // regular input with a value
          if (
            (input.type === 'radio' || input.type === 'checkbox') &&
            !input.checked
          ) {
            return
          }

          data[input.name] = input.value
        }
      })

      formData.append('data', JSON.stringify(data))

      // Add images
      Object.values(this.files).forEach(file => {
        formData.append('files.images', file, file.name)
      })

      this.saving = true
      this.$store
        .dispatch('submitArtwork', formData)
        .then(() => {
          this.submissionSucess = true
          this.clearForm()
          this.saving = false
        })
        .error(() => {
          this.submissionError = true
          this.saving = false
        })
    },
  },
}
</script>
