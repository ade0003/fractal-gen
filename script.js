const canvas = document.getElementById("fractalCanvas");
const ctx = canvas.getContext("2d");

function generateFractal() {
  const fractalType = document.getElementById("fractalType").value;
  const maxIterations = parseInt(
    document.getElementById("maxIterations").value
  );
  const width = canvas.width;
  const height = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  if (fractalType === "mandelbrot") {
    generateMandelbrot(width, height, maxIterations);
  } else if (fractalType === "julia") {
    const juliaConstantRe = parseFloat(
      document.getElementById("juliaConstantRe").value
    );
    const juliaConstantIm = parseFloat(
      document.getElementById("juliaConstantIm").value
    );
    generateJulia(
      width,
      height,
      maxIterations,
      juliaConstantRe,
      juliaConstantIm
    );
  }
}

function generateMandelbrot(width, height, maxIterations) {
  const minRe = -2;
  const maxRe = 1;
  const minIm = -1;
  const maxIm = 1;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const re = map(x, 0, width, minRe, maxRe);
      const im = map(y, 0, height, minIm, maxIm);

      let cre = re;
      let cim = im;
      let n = 0;

      while (n < maxIterations) {
        const reSquared = cre * cre;
        const imSquared = cim * cim;

        if (reSquared + imSquared > 4) {
          break; // Escape the loop if it diverges
        }

        const newRe = reSquared - imSquared + re;
        const newIm = 2 * cre * cim + im;

        cre = newRe;
        cim = newIm;

        n++;
      }

      // Map the number of iterations to a color
      const brightness = map(n, 0, maxIterations, 0, 255);
      const color = `rgb(${brightness}, ${brightness}, ${brightness})`;

      // Draw a pixel on the canvas
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function generateJulia(width, height, maxIterations, constantRe, constantIm) {
  const minRe = -2;
  const maxRe = 2;
  const minIm = -2;
  const maxIm = 2;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const re = map(x, 0, width, minRe, maxRe);
      const im = map(y, 0, height, minIm, maxIm);

      let cre = re;
      let cim = im;
      let n = 0;

      while (n < maxIterations) {
        const reSquared = cre * cre;
        const imSquared = cim * cim;

        if (reSquared + imSquared > 4) {
          break; // Escape the loop if it diverges
        }

        const newRe = reSquared - imSquared + constantRe;
        const newIm = 2 * cre * cim + constantIm;

        cre = newRe;
        cim = newIm;

        n++;
      }

      // Map the number of iterations to a color
      const brightness = map(n, 0, maxIterations, 0, 255);
      const color = `rgb(${brightness}, ${brightness}, ${brightness})`;

      // Draw a pixel on the canvas
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
function generateBurningShip(width, height, maxIterations) {
  const minRe = -2;
  const maxRe = 1;
  const minIm = -2;
  const maxIm = 1;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let re = map(x, 0, width, minRe, maxRe);
      let im = map(y, 0, height, minIm, maxIm);

      let cre = re;
      let cim = im;
      let n = 0;

      while (n < maxIterations) {
        const reSquared = cre * cre;
        const imSquared = cim * cim;

        if (reSquared + imSquared > 4) {
          break; // Escape the loop if it diverges
        }

        const newRe = Math.abs(reSquared - imSquared + re);
        const newIm = Math.abs(2 * cre * cim + im);

        cre = newRe;
        cim = newIm;

        n++;
      }

      // Map the number of iterations to a color
      const brightness = map(n, 0, maxIterations, 0, 255);
      const color = `rgb(${brightness}, ${brightness}, ${brightness})`;

      // Draw a pixel on the canvas
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
