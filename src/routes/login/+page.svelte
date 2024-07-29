<script lang="ts">
	import type { BaseAuthStore, ClientResponseError } from "pocketbase";
  import { pbStore, User } from "svelte-pocketbase";
  import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { goto } from "$app/navigation";

  const toastStore = getToastStore();
			
  const invalid: ToastSettings = {
    message: 'Invalid Email or Password!',
    // Provide any utility or variant background style:
    background: 'variant-glass-error',
  };

  const loginError: ToastSettings = {
    message: 'Error logging in. Try again',
    // Provide any utility or variant background style:
    background: 'variant-glass-error',
  };

  const signUpError: ToastSettings = {
    message: 'Error signing up. Try again',
    // Provide any utility or variant background style:
    background: 'variant-glass-error',
  };

  const forgotError: ToastSettings = {
    message: 'Error sending reset email. Try again',
    // Provide any utility or variant background style:
    background: 'variant-glass-error',
  };


  const resetSent: ToastSettings = {
    message: 'Password reset has been sent 📥',
    // Provide any utility or variant background style:
    background: 'variant-glass-success',
  };

  const resetSentAlready: ToastSettings = {
    message: "You've already requested a reset... </br> Check your junk/spam folder 🗑️",
    // Provide any utility or variant background style:
    background: 'variant-glass-warning',
  };

  let email: string;
  let password: string;

  async function login() {
    try {
      const user = await $pbStore.collection('users').authWithPassword(email, password)
      //console.log($pbStore.authStore.isValid) 
      goto("/vote")
    } catch (error) {
      let err = error as ClientResponseError

      if (err.message == "Failed to authenticate.") {
        console.log("Invalid Email or password")
        toastStore.trigger(invalid)
      }else {
        toastStore.trigger(loginError)
      }
    }


    
  }

  async function signUp() {
    try {
      const data = {
        email,
        password,
        passwordConfirm: password,
        role: "user"
      };
      const createdUser = await $pbStore.collection('users').create(data);
      await login();
    } catch (error) {
      toastStore.trigger(signUpError)
    }
  }

  let resetRequested = false

  async function resetPassword() {
    try {
      if (resetRequested) {
        toastStore.trigger(resetSentAlready)
        return
      }
      const user = await $pbStore.collection('users').requestPasswordReset(email)
      toastStore.trigger(resetSent)
      resetRequested = true
    }catch (error) {
      toastStore.trigger(forgotError)
    }
  }
  
  function loginSubmit() {
    console.log("yay")
  }

  function signOut() {
    console.log($pbStore.authStore.isValid)
    $pbStore.authStore.clear()
    console.log($pbStore.authStore.isValid)
    console.log("signign out")
  }

  $: console.log($pbStore.authStore.isValid)


</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
  <User let:user>
    <p>
      Signed in as {user?.email} 
      <button on:click={signOut}>Sign Out</button>
    </p>
  </User>
    {#if !$pbStore.authStore.isValid}
      <form on:submit|preventDefault={loginSubmit} class="flex flex-col card p-7 justify-center text-left w-[22rem]">
        <h1 class="h2 mb-2">Login</h1>
        <p class="mb-2 opacity-80">Enter your email and password</p>

        <input
          placeholder="E-mail"
          type="email"
          bind:value={email}
          class="input my-2"
          required
        />

        <input 
          placeholder="Password" 
          type="password" 
          bind:value={password} 
          class="input mb-2"
          required
        />
        
        <button type="submit" class="btn variant-filled-primary my-2" on:click={login}>Login</button>
        <button class="btn variant-filled-surface mb-2" on:click={signUp}>Sign Up</button>
        <!-- svelte-ignore a11y-invalid-attribute -->
        <p class="text-center opacity-80 text-sm mt-2">Forgot your password? <a href="" class="underline" on:click={resetPassword}>Reset password</a></p>
        <!--
        <button class="btn variant-filled-primary" on:click={signUp}>Sign Up</button>
        -->
      </form>
    {/if}
</div>