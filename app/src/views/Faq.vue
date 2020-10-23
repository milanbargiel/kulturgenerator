<template>
  <div class="content">
    <div class="text longer-text-container">
      <p>
        <b>Was ist der Kulturgenerator?</b><br>
        Eine generöse Umverteilungsmaschine und ein virtueller Laden auf Zeit, ein Experiment und eine Plattform, die Angebote von Künstler*innen und Kulturschaffenden aller Sparten präsentiert und die Sichtbarkeit der Szene erhöht. Im Generator gibt es keine Hierarchie, jedes Angebot erscheint zufällig und gleichberechtigt angeordnet nebeneinander.
      </p>

      <p>
        <b>Wie funktioniert der Kulturgenerator?</b><br>
        Indem Angebote in den Kulturgenerator eingespeist werden. Der Generator wandelt diese durch Verkäufe in monetäre Energie um. Wir stellen die Plattform zur Verfügung. Die Transaktion und die Abwicklung des Verkaufs erfolg zwischen Kulturschaffenden und Käufer*innen. Die Teilnehmenden können angeben, ob sie im Falle des Verkaufs 50 oder 100 Prozent ihrer Einnahmen in das solidarische Konto einzahlen möchten. Die dort gesammelten Erlöse werden wenn der Generator ausreichend gefüllt ist, unter allen Beteiligten verteilt, unabhängig davon, ob das Angebot verkauft wurde oder nicht. Unser Ziel ist es, im Generator eingenommenes Geld unter allen Beteiligten fair zu verteilen.
      </p>

      <p><b>An wen richtet sich der Kulturgenerator?</b><br>
        An freischaffende Künstlerinnen und Künstler aller Sparten, aber auch an Kultureinrichtungen wie Institutionen oder Kollektive und Leute, die im kulturorganisatorischen Feld arbeiten.
      </p>

      <p><b>Gibt es eine Plausibilitätsprüfung?</b><br>
      Ja. Vom Generator sollen nur diejenigen profitieren, die professionell als Kunst- und Kulturschaffende tätig sind. Sie können durch eine kurze Beschreibung Ihre kulturschaffende Tätigkeit nachweisen. Als kulturschaffend verstehen wir sowohl Arbeit im Bereich der bildenden, darstellenden und angewandten Kunst, als auch kulturorganisatorische Arbeit. Es werden auch Angebote von Akteur*innen entgegengenommen, die sich in der Kulturszene in hohem Maße ehrenamtlich engagieren. Bitte beachten Sie, dass nicht jedes eingereichte Angebot in den Generator aufgenommen werden kann.</p>

      <p><b>Was kann ein Angebot sein?</b><br>
        Wir haben drei Kategorien, innerhalb dieser Sie Ihr Angebot einordnen können:
        <p>1. Materielle künstlerische Objekte, z.B. Gemälde, Fotografien, Plakate, Zeichnungen, Skulpturen, Skizzen, Druckmedien, Plastiken, Installationen, Bild- und Tonträger.</p>
        <p>2. Kulturelle Erlebnisse z.B. Online-Angebote, Kurse, Workshops, Konzerte, Lesungen, Filmvorführungen, Sonderveranstaltungen, Streamingangebote, Atelierbesuche. 
        </p>
        <p>3. Digitale Motive zur Verarbeitung im Generator z.B. Visualisierungen, Zeichnungen, Illustrationen, Vektorgrafiken, Bitmaps, Renderings. Die Niehler Freiheit wählt Motive aus und druckt sie in ehrenamtlicher Arbeit als Kleinserie auf Textilien. Weitere mögliche Formen werden per Mail mit den Einreichenden individuell besprochen.
        </p>
        <p>
          Da der Textildruck in ehrenamtlicher Arbeit geschieht, bitten wir zu beachten, dass nicht alle Einreichungen gedruckt werden können.
          Die Datei muss entweder als Vektorgrafik angelegt sein (hier ist eine ca. 0,5mm Linie noch scharf darstellbar) oder als Bitmap in Graustufen mit 300 DPI und gerastert (eine fotorealistischer Druck funktioniert am besten mit: Halbtonraster Rasterweite 27 Linien pro Zoll, 22,5 Grad gewinkelt, Form: Ellipse). Eine Kombination von Beidem ist möglich.
        </p>

        <p><b>Wie werden die Angebote im Kulturgenerator präsentiert?</b><br>
          Die angebotenen Produkte werden nach einem Zufallsprinzip präsentiert. So erscheinen sie gleichberechtigt nebeneinander und jedes Mal neu.
        </p>

        <p><b>Warum dieses Zufallsprinzip?</b><br>
        Es macht Lust auf Entdeckungen und weitet den Blick auf die diverse Kulturszene der Stadt. Gleichzeitig wollen wir verhindern, dass Kultur im digitalen Raum als Massenware abgebildet wird und generieren Aufmerksamkeit für jedes einzelne Angebot.</p>

        <p><b>Kann ich beliebig viele Angebote einreichen?</b><br>
          Nein, wir bitten Sie nicht mehr als zwei Angebote einzureichen, um anderen die Chance zur Teilnahme zu ermöglichen.
        </p>

        <p><b>Wie viel darf ein Angebot kosten?</b><br>
        Sie können den Preis selbst bestimmen. Wir bitten Sie allerdings um marktübliche Preiseinschätzung Ihrer Arbeiten. </p>

        <p><b>Was passiert, wenn mein Angebot verkauft wird?</b><br>
          Wenn Ihr Angebot verkauft wird, erhalten Sie einen Kontakt zur Käuferin oder zum Käufer sowie eine Benachrichtigung über das weitere Vorgehen. Der Erlös des Verkaufs wird direkt auf Ihr PayPal Konto überwiesen. Dabei behält PayPal 1,9 Prozent des Gesamtverkaufswert plus einer Transaktionsgebühr von 25 Cent ein.
        </p>
        <p><b>Kann ich eine Spendenquittung erhalten?</b><br>
          Wenn Sie 50 oder 100 Prozent Ihrer Einnahmen solidarisch umverteilen wollen, aber nicht an der Ausschüttung des Generators beteiligt werden wollen, können wir Ihnen eine Spendenquittung ausstellen.
        </p>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'Faq',
    created () {
      this.$store.commit('SET_LOADING_STATE', false)
    }
  }
  </script>
