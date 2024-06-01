<script>
  import Second from './second.svelte'

  let inputBinding

  function change() {
    inputBinding.value = 'testing' + Math.round(Math.random() * 100)
  }
</script>

<div class="test">
  <h1 class="text-red-500">Hello world!</h1>
  <label for="testingInput"
    >This gets changed when you press the button:
  </label>
  <input
    class="border p-2"
    type="text"
    name="testingInput"
    bind:this={inputBinding}
  />
</div>

<div class="secondStyle">
  <button
    class="outline-none bg-gray-200 border px-3 py-2 rounded"
    on:click={change}>Click this button!</button
  >

  <Second />
</div>

<style>
  .test {
    display: inline-block;
    background-color: #ff3e00;
    color: white;
  }

  .secondStyle {
    display: block;
  }
</style>
